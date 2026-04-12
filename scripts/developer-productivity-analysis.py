#!/usr/bin/env python3
"""
Developer Productivity Analysis for twentyhq/twenty
Analyzes the top 15 developers over the last 3 months.

Metrics:
  - PR count (filtered for relevance)
  - Lines of code changed (insertions + deletions), excluding generated files
  - Files touched (meaningful files only)
  - Complexity score (weighted by file types, spread, and size)
  - Productivity score (composite)

Filters out:
  - Bot commits (github-actions[bot], dependabot[bot], sonarly[bot])
  - i18n/translation-only PRs
  - Version bump-only PRs (canary releases)
  - AI model catalog syncs
  - Generated files: yarn.lock, package-lock.json, node_modules, dist/
  - Commits that are >95% generated file changes

Complexity heuristics:
  - Backend (NestJS/TypeORM) files weighted higher than config/docs
  - Database migrations weighted highly
  - Test files contribute but at reduced weight
  - File spread across packages increases complexity
  - Large PRs get diminishing returns (sqrt scaling)
"""

import subprocess
import re
import math
from collections import defaultdict
from datetime import datetime

SINCE_DATE = "2026-01-12"
TODAY = "2026-04-12"

BOT_AUTHORS = {
    "github-actions[bot]",
    "dependabot[bot]",
    "sonarly[bot]",
    "renovate[bot]",
}

SKIP_PATTERNS = [
    r"^i18n\s*[-\u2013\u2014]\s*translations",
    r"^i18n\s*[-\u2013\u2014]\s*docs translations",
    r"^chore:\s*sync AI model catalog",
    r"^Bump twenty-sdk.*canary",
    r"^Bump twenty-client-sdk.*canary",
    r"^Bump twenty-sdk, twenty-client-sdk, create-twenty-app",
]

# Files/paths to exclude from LOC and complexity calculations
GENERATED_FILE_PATTERNS = [
    r"(^|/)yarn\.lock$",
    r"(^|/)package-lock\.json$",
    r"(^|/)pnpm-lock\.yaml$",
    r"(^|/)node_modules/",
    r"(^|/)dist/",
    r"(^|/)build/",
    r"(^|/)\.next/",
    r"(^|/)coverage/",
    r"\.min\.(js|css)$",
    r"\.bundle\.(js|css)$",
    r"\.chunk\.(js|css)$",
    r"(^|/)__generated__/",
    r"\.generated\.",
    r"(^|/)\.yarn/",
]

GENERATED_RE = [re.compile(p) for p in GENERATED_FILE_PATTERNS]

# Outlier thresholds: commits exceeding these are likely rebases/squashes of entire tree
MAX_FILES_PER_COMMIT = 500  # Normal large PRs rarely touch >500 files
MAX_LOC_PER_COMMIT = 100000  # 100K LOC is extremely unusual for a single PR

# File type complexity weights
FILE_WEIGHTS = {
    # Backend - high complexity
    "service.ts": 1.5,
    "resolver.ts": 1.5,
    "module.ts": 1.2,
    "entity.ts": 1.4,
    "guard.ts": 1.3,
    "interceptor.ts": 1.3,
    "decorator.ts": 1.2,
    "middleware.ts": 1.3,
    "command.ts": 1.3,
    "handler.ts": 1.3,
    "job.ts": 1.3,
    "worker.ts": 1.3,
    "factory.ts": 1.2,
    # Database
    "migration.ts": 1.6,
    "instance-command.ts": 1.5,
    "workspace-command.ts": 1.5,
    # Frontend - moderate complexity
    "component.tsx": 1.2,
    "hook.ts": 1.3,
    "hook.tsx": 1.3,
    "context.tsx": 1.2,
    "util.ts": 1.1,
    "utils.ts": 1.1,
    # Tests
    "spec.ts": 0.7,
    "spec.tsx": 0.7,
    "test.ts": 0.7,
    "test.tsx": 0.7,
    "stories.tsx": 0.5,
    # Config/docs - low complexity
    "json": 0.4,
    "md": 0.3,
    "yml": 0.5,
    "yaml": 0.5,
    "env": 0.3,
    "lock": 0.1,
}


def run_git(args):
    result = subprocess.run(
        ["git"] + args,
        capture_output=True,
        text=True,
        cwd="/home/user/twenty",
    )
    return result.stdout.strip()


def is_generated_file(filepath):
    """Check if a file is a generated/vendored file that should be excluded."""
    for pattern in GENERATED_RE:
        if pattern.search(filepath):
            return True
    return False


def get_file_weight(filepath):
    """Determine complexity weight for a file based on its type."""
    if is_generated_file(filepath):
        return 0.0
    fp = filepath.lower()
    # Check compound suffixes first (e.g., ".service.ts")
    for suffix, weight in FILE_WEIGHTS.items():
        if "." in suffix and fp.endswith("." + suffix):
            return weight
    # Then check simple extension
    ext = fp.rsplit(".", 1)[-1] if "." in fp else ""
    if ext in FILE_WEIGHTS:
        return FILE_WEIGHTS[ext]
    # Default weights by extension
    if ext in ("ts", "tsx"):
        return 1.0
    if ext in ("js", "jsx"):
        return 0.9
    if ext in ("css", "scss"):
        return 0.6
    if ext in ("sql",):
        return 1.4
    if ext in ("graphql", "gql"):
        return 1.2
    return 0.5


def get_packages_touched(files):
    """Count how many distinct packages a commit touches."""
    packages = set()
    for f in files:
        parts = f.split("/")
        if len(parts) >= 2 and parts[0] == "packages":
            packages.add(parts[1])
    return packages


def should_skip_commit(subject):
    """Check if a commit should be filtered out."""
    for pattern in SKIP_PATTERNS:
        if re.search(pattern, subject, re.IGNORECASE):
            return True
    return False


def extract_pr_number(subject):
    """Extract PR number from commit subject like 'Fix something (#1234)'."""
    match = re.search(r"\(#(\d+)\)\s*$", subject)
    return int(match.group(1)) if match else None


def classify_commit(subject):
    """Classify commit type from its subject line."""
    subj = subject.lower()
    if subj.startswith("fix") or ": fix" in subj:
        return "bugfix"
    if subj.startswith("feat") or "add " in subj or "implement" in subj or "support" in subj:
        return "feature"
    if "refactor" in subj:
        return "refactor"
    if "test" in subj:
        return "test"
    if "perf" in subj or "optim" in subj:
        return "performance"
    if "clean" in subj or "remove" in subj or "delete" in subj:
        return "cleanup"
    if "upgrade" in subj or "bump" in subj or "update" in subj:
        return "maintenance"
    if "doc" in subj:
        return "docs"
    return "other"


def compute_complexity(files_data, packages_touched):
    """
    Compute a complexity score for a commit.

    Factors:
    1. Weighted lines of code (by file type, generated files excluded)
    2. Number of distinct packages touched (cross-cutting changes are harder)
    3. Diminishing returns on raw LOC (sqrt scaling to avoid gaming)
    4. File count factor (only meaningful files)
    """
    weighted_loc = 0
    meaningful_files = 0
    for filepath, (ins, dels) in files_data.items():
        weight = get_file_weight(filepath)
        if weight > 0:
            weighted_loc += (ins + dels) * weight
            meaningful_files += 1

    # Diminishing returns on LOC
    loc_score = math.sqrt(weighted_loc) if weighted_loc > 0 else 0

    # Package spread bonus (cross-cutting changes are more complex)
    pkg_count = len(packages_touched)
    spread_multiplier = 1.0 + (pkg_count - 1) * 0.15 if pkg_count > 1 else 1.0

    # File count factor (touching many files is harder, with diminishing returns)
    file_factor = 1.0 + math.log2(max(meaningful_files, 1)) * 0.1

    complexity = loc_score * spread_multiplier * file_factor
    return round(complexity, 1)


def gather_commit_data():
    """Parse git log and gather per-commit statistics."""
    hashes_output = run_git([
        "log", f"--since={SINCE_DATE}", "--format=%H|%aN|%aI|%s", "--no-merges"
    ])

    commits = []
    for line in hashes_output.split("\n"):
        if not line.strip():
            continue
        parts = line.split("|", 3)
        if len(parts) < 4:
            continue
        commit_hash, author, date, subject = parts
        commits.append({
            "hash": commit_hash,
            "author": author,
            "date": date,
            "subject": subject,
        })

    return commits


def get_commit_stats(commit_hash):
    """Get per-file insertion/deletion stats for a commit, filtering generated files."""
    numstat = run_git(["show", "--numstat", "--format=", commit_hash])
    files_data = {}
    total_ins = 0
    total_dels = 0
    generated_loc = 0

    for line in numstat.split("\n"):
        if not line.strip():
            continue
        parts = line.split("\t")
        if len(parts) < 3:
            continue
        ins_str, del_str, filepath = parts
        ins = int(ins_str) if ins_str != "-" else 0
        dels = int(del_str) if del_str != "-" else 0

        if is_generated_file(filepath):
            generated_loc += ins + dels
            continue

        files_data[filepath] = (ins, dels)
        total_ins += ins
        total_dels += dels

    return total_ins, total_dels, files_data, generated_loc


def format_number(n):
    """Format a number with commas."""
    if isinstance(n, float):
        return f"{n:,.1f}"
    return f"{n:,}"


def bar_chart(value, max_value, width=30):
    """Create a simple ASCII bar chart."""
    if max_value == 0:
        return ""
    filled = int((value / max_value) * width)
    return "\u2588" * filled + "\u2591" * (width - filled)


def main():
    print("=" * 90)
    print("  DEVELOPER PRODUCTIVITY ANALYSIS \u2014 twentyhq/twenty")
    print(f"  Period: {SINCE_DATE} to {TODAY} (last 3 months)")
    print("=" * 90)
    print()

    # Gather raw commit data
    print("Gathering commit data...")
    raw_commits = gather_commit_data()
    total_raw = len(raw_commits)

    # Filter
    filtered_commits = []
    skipped_bot = 0
    skipped_pattern = 0

    for c in raw_commits:
        if c["author"] in BOT_AUTHORS:
            skipped_bot += 1
            continue
        if should_skip_commit(c["subject"]):
            skipped_pattern += 1
            continue
        filtered_commits.append(c)

    print(f"  Total commits:     {total_raw}")
    print(f"  Bot commits:       {skipped_bot} (filtered)")
    print(f"  Noise commits:     {skipped_pattern} (filtered)")
    print(f"  Pre-filter total:  {len(filtered_commits)} commits")
    print()

    # Gather detailed stats per commit
    print("Analyzing commit complexity (this may take a moment)...")
    developer_data = defaultdict(lambda: {
        "commits": 0,
        "prs": set(),
        "insertions": 0,
        "deletions": 0,
        "files_touched": 0,
        "generated_loc_filtered": 0,
        "complexity_total": 0.0,
        "complexity_values": [],
        "packages_touched": set(),
        "commit_types": defaultdict(int),
        "top_commits": [],
        "active_days": set(),
        "weekly_commits": defaultdict(int),
    })

    skipped_outlier = 0
    for i, c in enumerate(filtered_commits):
        if (i + 1) % 50 == 0:
            print(f"  Processing commit {i + 1}/{len(filtered_commits)}...")

        author = c["author"]
        ins, dels, files_data, generated_loc = get_commit_stats(c["hash"])

        # Outlier detection: skip commits that look like full-tree rebases/squashes
        total_loc = ins + dels
        file_count = len(files_data)
        if file_count > MAX_FILES_PER_COMMIT or total_loc > MAX_LOC_PER_COMMIT:
            skipped_outlier += 1
            print(f"  [OUTLIER] Skipping '{c['subject'][:60]}...' "
                  f"({file_count} files, {total_loc:,} LOC) - likely rebase/squash artifact")
            continue

        packages = get_packages_touched(files_data.keys())
        complexity = compute_complexity(files_data, packages)
        commit_type = classify_commit(c["subject"])
        pr_num = extract_pr_number(c["subject"])
        date_str = c["date"][:10]

        try:
            dt = datetime.fromisoformat(c["date"])
            week_key = dt.strftime("%Y-W%W")
        except Exception:
            week_key = "unknown"

        d = developer_data[author]
        d["commits"] += 1
        if pr_num:
            d["prs"].add(pr_num)
        d["insertions"] += ins
        d["deletions"] += dels
        d["files_touched"] += len(files_data)
        d["generated_loc_filtered"] += generated_loc
        d["complexity_total"] += complexity
        d["complexity_values"].append(complexity)
        d["packages_touched"].update(packages)
        d["commit_types"][commit_type] += 1
        d["active_days"].add(date_str)
        d["weekly_commits"][week_key] += 1

        d["top_commits"].append((complexity, c["subject"][:80]))
        d["top_commits"].sort(key=lambda x: -x[0])
        d["top_commits"] = d["top_commits"][:5]

    analyzed = len(filtered_commits) - skipped_outlier
    print(f"\n  Outlier commits:   {skipped_outlier} (skipped - rebase/squash artifacts)")
    print(f"  Final analyzed:    {analyzed} commits")

    # Compute productivity scores
    scored = []
    for author, d in developer_data.items():
        pr_count = len(d["prs"]) if d["prs"] else d["commits"]
        active_days = len(d["active_days"])

        # Median complexity per PR (rewards consistently complex work over one-offs)
        sorted_cx = sorted(d["complexity_values"], reverse=True)
        median_cx = sorted_cx[len(sorted_cx) // 2] if sorted_cx else 0

        # Productivity score: weighted combination
        # - Total complexity (50%): cumulative impact
        # - PR throughput (20%): delivery cadence
        # - Consistency (15%): regularity of contribution
        # - Median complexity (15%): quality/depth of individual PRs
        productivity = (
            d["complexity_total"] * 0.50 +
            pr_count * 10 * 0.20 +
            active_days * 5 * 0.15 +
            median_cx * pr_count * 0.15
        )
        scored.append((author, d, productivity, pr_count, active_days))

    scored.sort(key=lambda x: -x[2])
    top_15 = scored[:15]

    max_prod = top_15[0][2] if top_15 else 1

    print()
    print("\u2500" * 90)
    print("  TOP 15 DEVELOPERS \u2014 RANKED BY PRODUCTIVITY SCORE")
    print("\u2500" * 90)
    print()
    sep = "\u2500"
    print(f"  {'#':<4} {'Developer':<22} {'PRs':>5} {'Cmplx':>7} {'LOC chg':>9} "
          f"{'Files':>6} {'Days':>5} {'Score':>7}  Bar")
    print(f"  {sep*4} {sep*22} {sep*5} {sep*7} {sep*9} "
          f"{sep*6} {sep*5} {sep*7}  {sep*30}")

    for rank, (author, d, productivity, pr_count, active_days) in enumerate(top_15, 1):
        loc_delta = d["insertions"] + d["deletions"]
        bar = bar_chart(productivity, max_prod, 30)
        print(f"  {rank:<4} {author:<22} {pr_count:>5} {d['complexity_total']:>7.0f} "
              f"{format_number(loc_delta):>9} {d['files_touched']:>6} {active_days:>5} "
              f"{productivity:>7.0f}  {bar}")

    # Detailed breakdowns
    print()
    print("=" * 90)
    print("  DETAILED DEVELOPER PROFILES")
    print("=" * 90)

    for rank, (author, d, productivity, pr_count, active_days) in enumerate(top_15, 1):
        loc_delta = d["insertions"] + d["deletions"]
        avg_complexity = d["complexity_total"] / d["commits"] if d["commits"] > 0 else 0

        sorted_cx = sorted(d["complexity_values"], reverse=True)
        median_cx = sorted_cx[len(sorted_cx) // 2] if sorted_cx else 0
        p90_cx = sorted_cx[max(0, len(sorted_cx) // 10)] if sorted_cx else 0

        types_str = ", ".join(
            f"{t}: {cnt}" for t, cnt in
            sorted(d["commit_types"].items(), key=lambda x: -x[1])
        )

        pkgs = sorted(p for p in d["packages_touched"] if not p.startswith("{"))
        pkgs_str = ", ".join(pkgs) if pkgs else "N/A"

        weeks = list(d["weekly_commits"].values())
        if len(weeks) > 1:
            mean_w = sum(weeks) / len(weeks)
            var_w = sum((w - mean_w) ** 2 for w in weeks) / len(weeks)
            std_w = math.sqrt(var_w)
            consistency = f"{mean_w:.1f} commits/week (over {len(weeks)} weeks, \u03c3={std_w:.1f})"
        elif weeks:
            consistency = f"{weeks[0]} commits in 1 active week"
        else:
            consistency = "N/A"

        gen_note = ""
        if d["generated_loc_filtered"] > 0:
            gen_note = f"\n  \u2502  Generated LOC filtered: {format_number(d['generated_loc_filtered'])} (excluded from analysis)"

        print(f"""
  \u250c\u2500 #{rank} {author}
  \u2502  Productivity Score: {productivity:.0f}
  \u2502
  \u2502  PRs Merged:         {pr_count}
  \u2502  Total Commits:      {d['commits']}
  \u2502  Lines Changed:      +{format_number(d['insertions'])} / -{format_number(d['deletions'])} ({format_number(loc_delta)} total)
  \u2502  Files Touched:      {format_number(d['files_touched'])} (meaningful files only){gen_note}
  \u2502  Active Days:        {active_days}
  \u2502  Complexity:         avg={avg_complexity:.1f}  median={median_cx:.1f}  p90={p90_cx:.1f}
  \u2502  Cadence:            {consistency}
  \u2502
  \u2502  Work Types:         {types_str}
  \u2502  Packages:           {pkgs_str}
  \u2502
  \u2502  Most Complex Contributions:""")
        for cx, subj in d["top_commits"][:5]:
            print(f"  \u2502    [{cx:>5.0f}] {subj}")
            bottom = "\u2500" * 88
        print(f"  \u2514{bottom}")

    # Summary statistics
    print()
    print("=" * 90)
    print("  TEAM SUMMARY")
    print("=" * 90)

    total_commits = sum(d["commits"] for _, d, _, _, _ in top_15)
    total_prs = sum(pr for _, _, _, pr, _ in top_15)
    total_loc = sum(d["insertions"] + d["deletions"] for _, d, _, _, _ in top_15)
    total_complexity = sum(d["complexity_total"] for _, d, _, _, _ in top_15)
    all_packages = set()
    for _, d, _, _, _ in top_15:
        all_packages.update(p for p in d["packages_touched"] if not p.startswith("{"))
    all_types = defaultdict(int)
    for _, d, _, _, _ in top_15:
        for t, c in d["commit_types"].items():
            all_types[t] += c

    # Average PR size
    avg_loc_per_pr = total_loc / total_prs if total_prs else 0
    avg_cx_per_pr = total_complexity / total_prs if total_prs else 0

    print(f"""
  Total PRs merged (top 15):   {total_prs}
  Total commits:               {total_commits}
  Total lines changed:         {format_number(total_loc)} (excl. generated files)
  Total complexity points:     {format_number(total_complexity)}
  Avg LOC per PR:              {format_number(avg_loc_per_pr)}
  Avg complexity per PR:       {avg_cx_per_pr:.1f}
  Packages touched:            {', '.join(sorted(all_packages))}
  """)

    print("  Work Type Distribution:")
    type_total = sum(all_types.values())
    for t, cnt in sorted(all_types.items(), key=lambda x: -x[1]):
        pct = cnt / type_total * 100
        bar = bar_chart(cnt, type_total, 20)
        print(f"    {t:<15} {cnt:>4} ({pct:>5.1f}%)  {bar}")

    # Concentration analysis
    print()
    print("  Contribution Concentration (top 15):")
    total_prod = sum(p for _, _, p, _, _ in top_15)
    cumulative = 0
    for rank, (author, d, productivity, pr_count, _) in enumerate(top_15, 1):
        cumulative += productivity
        pct = cumulative / total_prod * 100
        print(f"    Top {rank:>2}: {pct:>5.1f}% of total productivity  ({author})")
        if pct >= 99.5 and rank > 10:
            break

    # Insights
    print()
    print("=" * 90)
    print("  KEY INSIGHTS")
    print("=" * 90)

    # Top 3 by different metrics
    by_prs = sorted(scored[:15], key=lambda x: -x[3])
    by_complexity_avg = sorted(
        [(a, d, p, pr, ad) for a, d, p, pr, ad in scored[:15] if d["commits"] >= 3],
        key=lambda x: -(x[1]["complexity_total"] / x[1]["commits"])
    )
    by_consistency = sorted(scored[:15], key=lambda x: -len(x[1]["active_days"]))

    print(f"""
  Highest PR throughput:
    1. {by_prs[0][0]} ({by_prs[0][3]} PRs)
    2. {by_prs[1][0]} ({by_prs[1][3]} PRs)
    3. {by_prs[2][0]} ({by_prs[2][3]} PRs)

  Highest avg complexity per PR (min 3 PRs):
    1. {by_complexity_avg[0][0]} ({by_complexity_avg[0][1]['complexity_total']/by_complexity_avg[0][1]['commits']:.1f} avg)
    2. {by_complexity_avg[1][0]} ({by_complexity_avg[1][1]['complexity_total']/by_complexity_avg[1][1]['commits']:.1f} avg)
    3. {by_complexity_avg[2][0]} ({by_complexity_avg[2][1]['complexity_total']/by_complexity_avg[2][1]['commits']:.1f} avg)

  Most consistent (active days):
    1. {by_consistency[0][0]} ({len(by_consistency[0][1]['active_days'])} days)
    2. {by_consistency[1][0]} ({len(by_consistency[1][1]['active_days'])} days)
    3. {by_consistency[2][0]} ({len(by_consistency[2][1]['active_days'])} days)
  """)

    # Bus factor
    top3_prod = sum(p for _, _, p, _, _ in top_15[:3])
    bus_factor_pct = top3_prod / total_prod * 100
    print(f"  Bus Factor Warning: Top 3 developers account for {bus_factor_pct:.0f}% of total productivity.")
    if bus_factor_pct > 60:
        print("  -> Concentration is high. Knowledge sharing and cross-training recommended.")
    print()

    print("\u2500" * 90)
    print("  METHODOLOGY NOTES")
    print("\u2500" * 90)
    print("""
  Productivity Score = Complexity (50%) + PR Throughput (20%) + Consistency (15%)
                     + Median Complexity x PRs (15%)

  Complexity scoring:
  - Each file's lines changed are weighted by file type:
    * Backend services/resolvers/entities: 1.3-1.6x
    * Database migrations/commands: 1.5-1.6x
    * Frontend components/hooks: 1.2-1.3x
    * Tests: 0.5-0.7x
    * Config/docs/JSON: 0.3-0.5x
    * Generated/lock files: 0x (excluded entirely)
  - Weighted LOC uses sqrt scaling (diminishing returns on bulk changes)
  - Cross-package changes get a 15% spread multiplier per additional package
  - File count adds a logarithmic factor

  Filtered out:
  - Bot commits (github-actions, dependabot, sonarly)
  - Automated i18n translation PRs
  - Canary version bumps / AI model catalog syncs
  - Generated files (yarn.lock, node_modules, dist/, .min.js, etc.)

  Limitations:
  - Does not account for code review effort (reviewing others' PRs)
  - Does not measure design/architecture work done outside code
  - Squash-merge means individual commit granularity is lost
  - Cannot distinguish original work from AI-assisted code
  - Complexity heuristics are approximations, not absolute measures
  - Some developers may have work on branches not yet merged to main
""")


if __name__ == "__main__":
    main()
