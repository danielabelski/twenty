import { Command } from 'nest-commander';

import { ActiveOrSuspendedWorkspacesMigrationCommandRunner } from 'src/database/commands/command-runners/active-or-suspended-workspaces-migration.command-runner';
import { RunOnWorkspaceArgs } from 'src/database/commands/command-runners/workspaces-migration.command-runner';
import { WorkspaceIteratorService } from 'src/database/commands/command-runners/workspace-iterator.service';
import { MessagingMessageCleanerService } from 'src/modules/messaging/message-cleaner/services/messaging-message-cleaner.service';

@Command({
  name: 'messaging:message-cleaner-remove-orphans',
  description: 'Remove orphan message and threads from messaging',
})
export class MessagingMessageCleanerRemoveOrphansCommand extends ActiveOrSuspendedWorkspacesMigrationCommandRunner {
  constructor(
    protected readonly workspaceIteratorService: WorkspaceIteratorService,
    private readonly messagingMessageCleanerService: MessagingMessageCleanerService,
  ) {
    super(workspaceIteratorService);
  }

  override async runOnWorkspace({
    workspaceId,
  }: RunOnWorkspaceArgs): Promise<void> {
    try {
      await this.messagingMessageCleanerService.cleanOrphanMessagesAndThreads(
        workspaceId,
      );
    } catch (error) {
      this.logger.error('Error while deleting workflowRun', error);
    }
  }
}
