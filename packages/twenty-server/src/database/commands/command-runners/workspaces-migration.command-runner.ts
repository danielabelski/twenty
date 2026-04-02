import { Option } from 'nest-commander';
import { WorkspaceActivationStatus } from 'twenty-shared/workspace';

import { MigrationCommandRunner } from 'src/database/commands/command-runners/migration.command-runner';
import {
  type WorkspaceIteratorReport,
  WorkspaceIteratorService,
} from 'src/database/commands/command-runners/workspace-iterator.service';
import { GlobalWorkspaceDataSource } from 'src/engine/twenty-orm/global-workspace-datasource/global-workspace-datasource';

export type WorkspacesMigrationCommandOptions = {
  workspaceIds: string[];
  startFromWorkspaceId?: string;
  workspaceCountLimit?: number;
  dryRun?: boolean;
  verbose?: boolean;
};

export type RunOnWorkspaceArgs = {
  options: WorkspacesMigrationCommandOptions;
  workspaceId: string;
  dataSource?: GlobalWorkspaceDataSource;
  index: number;
  total: number;
};

export type WorkspaceMigrationReport = WorkspaceIteratorReport;

export abstract class WorkspacesMigrationCommandRunner<
  Options extends
    WorkspacesMigrationCommandOptions = WorkspacesMigrationCommandOptions,
> extends MigrationCommandRunner {
  protected workspaceIds: Set<string> = new Set();
  private startFromWorkspaceId: string | undefined;
  private workspaceCountLimit: number | undefined;
  public migrationReport: WorkspaceMigrationReport = {
    fail: [],
    success: [],
  };

  constructor(
    protected readonly workspaceIteratorService: WorkspaceIteratorService,
    protected readonly activationStatuses: WorkspaceActivationStatus[],
  ) {
    super();
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

  @Option({
    flags: '-w, --workspace-id [workspace_id]',
    description:
      'workspace id. Command runs on all workspaces matching the activation statuses if not provided.',
    required: false,
  })
  parseWorkspaceId(val: string): Set<string> {
    this.workspaceIds.add(val);

    return this.workspaceIds;
  }

  override async runMigrationCommand(
    _passedParams: string[],
    options: Options,
  ) {
    this.migrationReport = await this.workspaceIteratorService.iterate(
      {
        workspaceIds:
          this.workspaceIds.size > 0
            ? Array.from(this.workspaceIds)
            : undefined,
        activationStatuses: this.activationStatuses,
        startFromWorkspaceId: this.startFromWorkspaceId,
        workspaceCountLimit: this.workspaceCountLimit,
        dryRun: options.dryRun,
      },
      async (context) => {
        await this.runOnWorkspace({
          options,
          workspaceId: context.workspaceId,
          dataSource: context.dataSource,
          index: context.index,
          total: context.total,
        });
      },
    );
  }

  public abstract runOnWorkspace(args: RunOnWorkspaceArgs): Promise<void>;
}
