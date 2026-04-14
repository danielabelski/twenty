import { Logger } from '@nestjs/common';

import chalk from 'chalk';
import { Command, CommandRunner, Option } from 'nest-commander';

import { TwentyConfigService } from 'src/engine/core-modules/twenty-config/twenty-config.service';
import {
  type MigrationCursorStatus,
  UpgradeStatusService,
  type WorkspaceStatus,
} from 'src/engine/core-modules/upgrade/services/upgrade-status.service';

type UpgradeStatusOptions = {
  workspaceId?: string;
  failedOnly?: boolean;
};

@Command({
  name: 'upgrade:status',
  description:
    'Display upgrade status for instance and workspace commands, inferring versions from migration history',
})
export class UpgradeStatusCommand extends CommandRunner {
  private readonly logger = new Logger(UpgradeStatusCommand.name);

  constructor(
    private readonly upgradeStatusService: UpgradeStatusService,
    private readonly twentyConfigService: TwentyConfigService,
  ) {
    super();
  }

  override async run(
    _passedParams: string[],
    options: UpgradeStatusOptions,
  ): Promise<void> {
    try {
      const appVersion =
        this.twentyConfigService.get('APP_VERSION') ?? 'unknown';

      const lines: string[] = [
        '',
        chalk.bold(`APP_VERSION: ${appVersion}`),
        '',
      ];

      const instanceStatus =
        await this.upgradeStatusService.getInstanceStatus();

      const instanceFailed =
        instanceStatus.latestCommand?.status === 'failed';

      if (!options.failedOnly || instanceFailed) {
        lines.push(...this.formatInstanceStatus(instanceStatus));
      }

      const workspaceStatuses =
        await this.upgradeStatusService.getWorkspaceStatuses(
          options.workspaceId,
        );

      lines.push(
        ...this.formatWorkspaceStatuses(workspaceStatuses, options.failedOnly),
      );

      lines.push(
        ...this.formatSummary(
          instanceStatus,
          workspaceStatuses,
        ),
      );

      console.log(lines.join('\n'));
    } catch (error) {
      this.logger.error(
        chalk.red(`Failed to retrieve upgrade status: ${error.message}`),
      );
    }
  }

  private formatInstanceStatus(status: MigrationCursorStatus): string[] {
    return [
      chalk.bold.underline('Instance'),
      ...this.formatCursorStatus(status),
      '',
    ];
  }

  private formatWorkspaceStatuses(
    workspaceStatuses: WorkspaceStatus[],
    failedOnly?: boolean,
  ): string[] {
    const lines: string[] = [chalk.bold.underline('Workspace')];

    if (workspaceStatuses.length === 0) {
      lines.push(chalk.dim('  No active/suspended workspaces found'));

      return lines;
    }

    const failed = workspaceStatuses.filter(
      (status) => status.latestCommand?.status === 'failed',
    );

    if (!failedOnly) {
      const upToDate = workspaceStatuses.filter(
        (status) => status.latestCommand?.status !== 'failed',
      );

      for (const workspaceStatus of upToDate) {
        lines.push(...this.formatWorkspaceStatus(workspaceStatus));
      }
    }

    if (failed.length > 0) {
      const groupedByCommand = new Map<string, WorkspaceStatus[]>();

      for (const workspaceStatus of failed) {
        const commandName =
          workspaceStatus.latestCommand?.name ?? 'unknown';

        if (!groupedByCommand.has(commandName)) {
          groupedByCommand.set(commandName, []);
        }

        groupedByCommand.get(commandName)!.push(workspaceStatus);
      }

      for (const [commandName, statuses] of groupedByCommand) {
        lines.push(chalk.red.bold(`  Failed at: ${commandName}`));

        for (const workspaceStatus of statuses) {
          lines.push(...this.formatWorkspaceStatus(workspaceStatus, true));
        }
      }
    }

    return lines;
  }

  private formatWorkspaceStatus(
    status: WorkspaceStatus,
    nested = false,
  ): string[] {
    const baseIndent = nested ? '    ' : '  ';
    const detailIndent = nested ? '      ' : '    ';
    const label = status.displayName
      ? `${status.displayName} (${status.workspaceId})`
      : status.workspaceId;

    return [
      chalk.bold(`${baseIndent}${label}`),
      ...this.formatCursorStatus(status, detailIndent),
      '',
    ];
  }

  private formatCursorStatus(
    status: MigrationCursorStatus,
    indent = '  ',
  ): string[] {
    if (!status.latestCommand) {
      return [
        `${indent}Inferred version: ${chalk.dim('no commands found')}`,
      ];
    }

    const { latestCommand } = status;
    const statusLabel =
      latestCommand.status === 'completed'
        ? chalk.green('Up to date')
        : chalk.red('Failed');

    const lines: string[] = [
      `${indent}Inferred version: ${status.inferredVersion ?? chalk.dim('unknown')}`,
      `${indent}Latest command:   ${latestCommand.name}`,
      `${indent}Status:           ${statusLabel}`,
      `${indent}Executed by:      ${latestCommand.executedByVersion}`,
      `${indent}At:               ${latestCommand.createdAt.toISOString()}`,
    ];

    if (latestCommand.status === 'failed' && latestCommand.errorMessage) {
      lines.push(
        chalk.red(
          `${indent}Error:            ${latestCommand.errorMessage}`,
        ),
      );
    }

    return lines;
  }

  private formatSummary(
    instanceStatus: MigrationCursorStatus,
    workspaceStatuses: WorkspaceStatus[],
  ): string[] {
    const lines: string[] = [
      chalk.bold.underline('Summary'),
    ];

    const instanceLabel =
      instanceStatus.latestCommand?.status === 'failed'
        ? chalk.red('Failed')
        : chalk.green('Up to date');

    lines.push(`  Instance: ${instanceLabel}`);

    if (workspaceStatuses.length === 0) {
      lines.push(chalk.dim('  No workspaces'));

      return lines;
    }

    const failedStatuses = workspaceStatuses.filter(
      (status) => status.latestCommand?.status === 'failed',
    );
    const successCount = workspaceStatuses.length - failedStatuses.length;

    lines.push(
      `  Workspaces: ${chalk.green(`${successCount} up to date`)}, ${chalk.red(`${failedStatuses.length} failed`)} (${workspaceStatuses.length} total)`,
    );

    if (failedStatuses.length > 0) {
      const failureCounts = new Map<string, number>();

      for (const status of failedStatuses) {
        const commandName = status.latestCommand?.name ?? 'unknown';

        failureCounts.set(
          commandName,
          (failureCounts.get(commandName) ?? 0) + 1,
        );
      }

      for (const [commandName, count] of failureCounts) {
        lines.push(
          chalk.red(`    ${count} failed at: ${commandName}`),
        );
      }
    }

    lines.push('');

    return lines;
  }

  @Option({
    flags: '-w, --workspace-id <workspaceId>',
    description: 'Filter to a single workspace by ID',
  })
  parseWorkspaceId(value: string): string {
    return value;
  }

  @Option({
    flags: '-f, --failed-only',
    description: 'Only display failed instance and workspace commands',
  })
  parseFailedOnly(): boolean {
    return true;
  }
}
