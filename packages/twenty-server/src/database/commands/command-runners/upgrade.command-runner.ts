import { InjectRepository } from '@nestjs/typeorm';

import chalk from 'chalk';
import { Option } from 'nest-commander';
import { SemVer } from 'semver';
import { isDefined } from 'twenty-shared/utils';
import { Repository } from 'typeorm';

import { MigrationCommandRunner } from 'src/database/commands/command-runners/migration.command-runner';
import {
  type WorkspaceIteratorContext,
  WorkspaceIteratorService,
} from 'src/database/commands/command-runners/workspace-iterator.service';
import {
  type RunOnWorkspaceArgs,
  type WorkspacesMigrationCommandOptions,
  WorkspacesMigrationCommandRunner,
} from 'src/database/commands/command-runners/workspaces-migration.command-runner';
import { ActiveOrSuspendedWorkspacesMigrationCommandRunner } from 'src/database/commands/command-runners/active-or-suspended-workspaces-migration.command-runner';
import { CoreMigrationRunnerService } from 'src/database/commands/core-migration-runner/services/core-migration-runner.service';
import { type UpgradeCommandVersion } from 'src/engine/constants/upgrade-command-supported-versions.constant';
import { CoreEngineVersionService } from 'src/engine/core-engine-version/services/core-engine-version.service';
import { TwentyConfigService } from 'src/engine/core-modules/twenty-config/twenty-config.service';
import { WorkspaceEntity } from 'src/engine/core-modules/workspace/workspace.entity';
import { WorkspaceVersionService } from 'src/engine/workspace-manager/workspace-version/services/workspace-version.service';
import {
  type CompareVersionMajorAndMinorReturnType,
  compareVersionMajorAndMinor,
} from 'src/utils/version/compare-version-minor-and-major';

export type VersionCommands = (
  | WorkspacesMigrationCommandRunner
  | ActiveOrSuspendedWorkspacesMigrationCommandRunner
)[];
export type AllCommands = Record<UpgradeCommandVersion, VersionCommands>;

export type UpgradeCommandOptions = WorkspacesMigrationCommandOptions;

export abstract class UpgradeCommandRunner extends MigrationCommandRunner {
  private fromWorkspaceVersion: SemVer;
  private currentAppVersion: SemVer;
  private commands: VersionCommands;

  public abstract allCommands: AllCommands;

  private workspaceIds: Set<string> = new Set();
  private startFromWorkspaceId: string | undefined;
  private workspaceCountLimit: number | undefined;

  constructor(
    @InjectRepository(WorkspaceEntity)
    protected readonly workspaceRepository: Repository<WorkspaceEntity>,
    protected readonly twentyConfigService: TwentyConfigService,
    protected readonly coreEngineVersionService: CoreEngineVersionService,
    protected readonly workspaceVersionService: WorkspaceVersionService,
    protected readonly coreMigrationRunnerService: CoreMigrationRunnerService,
    protected readonly workspaceIteratorService: WorkspaceIteratorService,
  ) {
    super();
  }

  @Option({
    flags: '-w, --workspace-id [workspace_id]',
    description:
      'workspace id. Command runs on all active/suspended workspaces if not provided.',
    required: false,
  })
  parseWorkspaceId(val: string): Set<string> {
    this.workspaceIds.add(val);

    return this.workspaceIds;
  }

  @Option({
    flags: '--start-from-workspace-id [workspace_id]',
    description:
      'Start from a specific workspace id. Workspaces are processed in ascending order of id.',
    required: false,
  })
  parseStartFromWorkspaceId(val: string): string {
    this.startFromWorkspaceId = val;

    return val;
  }

  @Option({
    flags: '--workspace-count-limit [count]',
    description:
      'Limit the number of workspaces to process. Workspaces are processed in ascending order of id.',
    required: false,
  })
  parseWorkspaceCountLimit(val: string): number {
    this.workspaceCountLimit = parseInt(val);

    if (isNaN(this.workspaceCountLimit)) {
      throw new Error('Workspace count limit must be a number');
    }

    if (this.workspaceCountLimit <= 0) {
      throw new Error('Workspace count limit must be greater than 0');
    }

    return this.workspaceCountLimit;
  }

  private resolveVersionContext() {
    if (isDefined(this.commands)) {
      return;
    }

    const currentAppVersion = this.coreEngineVersionService.getCurrentVersion();
    const currentVersionMajorMinor =
      `${currentAppVersion.major}.${currentAppVersion.minor}.0` as UpgradeCommandVersion;
    const currentCommands = this.allCommands[currentVersionMajorMinor];

    if (!isDefined(currentCommands)) {
      throw new Error(
        `No command found for version ${currentAppVersion}. Please check the commands record.`,
      );
    }

    const previousVersion = this.coreEngineVersionService.getPreviousVersion();

    this.commands = currentCommands;
    this.fromWorkspaceVersion = previousVersion;
    this.currentAppVersion = currentAppVersion;

    this.logger.log(
      chalk.blue(
        [
          'Initialized upgrade context with:',
          `- currentVersion (migrating to): ${currentAppVersion}`,
          `- fromWorkspaceVersion: ${previousVersion}`,
          `- ${this.commands.length} commands`,
        ].join('\n   '),
      ),
    );
  }

  public migrationReport: {
    fail: { workspaceId: string; error: Error }[];
    success: { workspaceId: string }[];
  } = { fail: [], success: [] };

  override async runMigrationCommand(
    _passedParams: string[],
    options: UpgradeCommandOptions,
  ): Promise<void> {
    this.migrationReport = { fail: [], success: [] };

    // 1. Resolve version context
    try {
      this.resolveVersionContext();
    } catch (error) {
      this.migrationReport.fail.push({ error, workspaceId: 'global' });
    }

    // 2. Preflight: check workspaces are eligible
    if (this.migrationReport.fail.length === 0) {
      try {
        const hasWorkspaces =
          await this.workspaceVersionService.hasActiveOrSuspendedWorkspaces();

        if (!hasWorkspaces) {
          this.logger.log(
            chalk.blue('Fresh installation detected, skipping migration'),
          );

          return;
        }

        const workspacesBelowMinimumVersion =
          await this.workspaceVersionService.getWorkspacesBelowVersion(
            this.fromWorkspaceVersion.version,
          );

        if (workspacesBelowMinimumVersion.length > 0) {
          this.migrationReport.fail.push(
            ...workspacesBelowMinimumVersion.map((workspace) => ({
              error: new Error(
                `Unable to run the upgrade command. Aborting the upgrade process.
Please ensure that all workspaces are on at least the previous minor version (${this.fromWorkspaceVersion.version}).
If any workspaces are not on the previous minor version, roll back to that version and run the upgrade command again.`,
              ),
              workspaceId: workspace.id,
            })),
          );
        }
      } catch (error) {
        this.migrationReport.fail.push({ error, workspaceId: 'global' });
      }
    }

    if (this.migrationReport.fail.length > 0) {
      this.migrationReport.fail.forEach(({ error, workspaceId }) =>
        this.logger.error(
          `Error in workspace ${workspaceId}: ${error.message}`,
        ),
      );

      return;
    }

    // 3. Run core migrations
    await this.coreMigrationRunnerService.run();

    // 4. Run per-workspace commands
    const iteratorReport = await this.workspaceIteratorService.iterate(
      {
        workspaceIds:
          this.workspaceIds.size > 0
            ? Array.from(this.workspaceIds)
            : undefined,
        startFromWorkspaceId: this.startFromWorkspaceId,
        workspaceCountLimit: this.workspaceCountLimit,
        dryRun: options.dryRun,
      },
      async (context) => {
        await this.runOnWorkspace(context, options);
      },
    );

    this.migrationReport = iteratorReport;
  }

  private async runOnWorkspace(
    context: WorkspaceIteratorContext,
    options: UpgradeCommandOptions,
  ): Promise<void> {
    const { workspaceId, index, total } = context;

    this.logger.log(
      chalk.blue(
        `${options.dryRun ? '(dry run) ' : ''}Upgrading workspace ${workspaceId} from=${this.fromWorkspaceVersion} to=${this.currentAppVersion} ${index + 1}/${total}`,
      ),
    );

    const versionCompareResult =
      await this.compareWorkspaceVersionToFromVersion(workspaceId);

    switch (versionCompareResult) {
      case 'lower': {
        throw new Error(
          `WORKSPACE_VERSION_MISSMATCH Upgrade for workspace ${workspaceId} failed as its version is beneath fromWorkspaceVersion=${this.fromWorkspaceVersion.version}`,
        );
      }
      case 'equal': {
        for (const command of this.commands) {
          await command.runOnWorkspace({
            options,
            workspaceId,
            dataSource: context.dataSource,
            index,
            total,
          } satisfies RunOnWorkspaceArgs);
        }

        if (!options.dryRun) {
          await this.workspaceRepository.update(
            { id: workspaceId },
            { version: this.currentAppVersion.version },
          );
        }

        this.logger.log(
          chalk.blue(`Upgrade for workspace ${workspaceId} completed.`),
        );

        return;
      }
      case 'higher': {
        this.logger.log(
          chalk.blue(
            `Upgrade for workspace ${workspaceId} ignored as is already at a higher version.`,
          ),
        );

        return;
      }
      default: {
        throw new Error(
          `Should never occur, encountered unexpected value from compareWorkspaceVersionToFromVersion ${versionCompareResult}`,
        );
      }
    }
  }

  private async compareWorkspaceVersionToFromVersion(
    workspaceId: string,
  ): Promise<CompareVersionMajorAndMinorReturnType> {
    const workspace = await this.workspaceRepository.findOneByOrFail({
      id: workspaceId,
    });
    const currentWorkspaceVersion = workspace.version;

    if (!isDefined(currentWorkspaceVersion)) {
      throw new Error(`WORKSPACE_VERSION_NOT_DEFINED workspace=${workspaceId}`);
    }

    return compareVersionMajorAndMinor(
      currentWorkspaceVersion,
      this.fromWorkspaceVersion.version,
    );
  }
}
