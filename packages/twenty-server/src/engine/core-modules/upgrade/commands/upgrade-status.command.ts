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

      lines.push(...this.formatInstanceStatus(
        await this.upgradeStatusService.getInstanceStatus(),
      ));

      lines.push(...await this.formatWorkspaceStatuses(options.workspaceId));

      console.log(lines.join('\n'));
    } catch (error) {
      this.logger.error(
        chalk.red(`Failed to retrieve upgrade status: ${error.message}`),
      );
    }
  }

  private formatInstanceStatus(status: MigrationCursorStatus): string[] {
    return [
      chalk.bold.underline('Instance Commands'),
      ...this.formatCursorStatus(status),
      '',
    ];
  }

  private async formatWorkspaceStatuses(
    workspaceId?: string,
  ): Promise<string[]> {
    const workspaceStatuses =
      await this.upgradeStatusService.getWorkspaceStatuses(workspaceId);

    const lines: string[] = [chalk.bold.underline('Workspace Commands')];

    if (workspaceStatuses.length === 0) {
      lines.push(chalk.dim('  No active/suspended workspaces found'));

      return lines;
    }

    for (const workspaceStatus of workspaceStatuses) {
      lines.push(...this.formatWorkspaceStatus(workspaceStatus));
    }

    return lines;
  }

  private formatWorkspaceStatus(status: WorkspaceStatus): string[] {
    const label = status.displayName
      ? `${status.displayName} (${status.workspaceId})`
      : status.workspaceId;

    return [
      chalk.bold(`  ${label}`),
      `    Stored version:   ${status.storedVersion ?? chalk.dim('null')}`,
      ...this.formatCursorStatus(status, '    '),
      '',
    ];
  }

  private formatCursorStatus(
    status: MigrationCursorStatus,
    indent = '  ',
  ): string[] {
    const lines: string[] = [
      `${indent}Inferred version: ${status.inferredVersion ?? chalk.dim('no completed commands')}`,
      `${indent}Latest completed: ${status.latestCompletedCommand ?? chalk.dim('none')}`,
    ];

    if (status.latestCompletedAt) {
      lines.push(
        `${indent}Completed at:     ${status.latestCompletedAt.toISOString()}`,
      );
    }

    if (status.lastFailure) {
      lines.push(
        chalk.red(`${indent}LAST COMMAND FAILED:`),
        chalk.red(`${indent}  Command:     ${status.lastFailure.name}`),
        chalk.red(`${indent}  Executed by: ${status.lastFailure.executedByVersion}`),
        chalk.red(`${indent}  At:          ${status.lastFailure.createdAt.toISOString()}`),
      );

      if (status.lastFailure.errorMessage) {
        lines.push(
          chalk.red(`${indent}  Error:       ${status.lastFailure.errorMessage}`),
        );
      }
    }

    return lines;
  }

  @Option({
    flags: '-w, --workspace-id <workspaceId>',
    description: 'Filter to a single workspace by ID',
  })
  parseWorkspaceId(value: string): string {
    return value;
  }
}
