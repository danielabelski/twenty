import { WorkspaceActivationStatus } from 'twenty-shared/workspace';

import {
  WorkspacesMigrationCommandRunner,
  type WorkspacesMigrationCommandOptions,
} from 'src/database/commands/command-runners/workspaces-migration.command-runner';
import { type WorkspaceIteratorService } from 'src/database/commands/command-runners/workspace-iterator.service';

export type ActiveOrSuspendedWorkspacesMigrationCommandOptions =
  WorkspacesMigrationCommandOptions;

export abstract class ActiveOrSuspendedWorkspacesMigrationCommandRunner<
  Options extends
    ActiveOrSuspendedWorkspacesMigrationCommandOptions = ActiveOrSuspendedWorkspacesMigrationCommandOptions,
> extends WorkspacesMigrationCommandRunner<Options> {
  constructor(
    protected readonly workspaceIteratorService: WorkspaceIteratorService,
  ) {
    super(workspaceIteratorService, [
      WorkspaceActivationStatus.ACTIVE,
      WorkspaceActivationStatus.SUSPENDED,
    ]);
  }
}
