import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { type Repository } from 'typeorm';

import { Process } from 'src/engine/core-modules/message-queue/decorators/process.decorator';
import { Processor } from 'src/engine/core-modules/message-queue/decorators/processor.decorator';
import { MessageQueue } from 'src/engine/core-modules/message-queue/message-queue.constants';
import { UserWorkspaceEntity } from 'src/engine/core-modules/user-workspace/user-workspace.entity';
import { ConnectedAccountEntity } from 'src/engine/metadata-modules/connected-account/entities/connected-account.entity';
import { GlobalWorkspaceOrmManager } from 'src/engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager';
import { buildSystemAuthContext } from 'src/engine/twenty-orm/utils/build-system-auth-context.util';
import { type WorkspaceMemberWorkspaceEntity } from 'src/modules/workspace-member/standard-objects/workspace-member.workspace-entity';

export type DeleteWorkspaceMemberConnectedAccountsCleanupJobData = {
  workspaceId: string;
  workspaceMemberId: string;
};

@Processor(MessageQueue.deleteCascadeQueue)
export class DeleteWorkspaceMemberConnectedAccountsCleanupJob {
  private readonly logger = new Logger(
    DeleteWorkspaceMemberConnectedAccountsCleanupJob.name,
  );

  constructor(
    private readonly globalWorkspaceOrmManager: GlobalWorkspaceOrmManager,
    @InjectRepository(ConnectedAccountEntity)
    private readonly connectedAccountRepository: Repository<ConnectedAccountEntity>,
    @InjectRepository(UserWorkspaceEntity)
    private readonly userWorkspaceRepository: Repository<UserWorkspaceEntity>,
  ) {}

  @Process(DeleteWorkspaceMemberConnectedAccountsCleanupJob.name)
  async handle(
    data: DeleteWorkspaceMemberConnectedAccountsCleanupJobData,
  ): Promise<void> {
    const { workspaceId, workspaceMemberId } = data;

    const authContext = buildSystemAuthContext(workspaceId);

    await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async () => {
      const workspaceMemberRepo =
        await this.globalWorkspaceOrmManager.getRepository<WorkspaceMemberWorkspaceEntity>(
          workspaceId,
          'workspaceMember',
          { shouldBypassPermissionChecks: true },
        );

      const member = await workspaceMemberRepo.findOne({
        where: { id: workspaceMemberId },
        withDeleted: true,
      });

      if (!member) {
        this.logger.warn(
          `Workspace member ${workspaceMemberId} not found (even with soft-deleted) in workspace ${workspaceId}`,
        );

        return;
      }

      const userWorkspace = await this.userWorkspaceRepository.findOne({
        where: { userId: member.userId, workspaceId },
      });

      if (userWorkspace) {
        await this.connectedAccountRepository.delete({
          userWorkspaceId: userWorkspace.id,
          workspaceId,
        });

        return;
      }

      // UserWorkspace was already hard-deleted — look up connected accounts
      // directly by the workspace member's userId via userWorkspace records
      // that may still reference this workspace
      const connectedAccounts = await this.connectedAccountRepository.find({
        where: { workspaceId },
      });

      const orphanedAccounts = [];

      for (const account of connectedAccounts) {
        const accountUserWorkspace =
          await this.userWorkspaceRepository.findOne({
            where: { id: account.userWorkspaceId },
          });

        if (!accountUserWorkspace) {
          orphanedAccounts.push(account);
        }
      }

      if (orphanedAccounts.length > 0) {
        this.logger.warn(
          `Found ${orphanedAccounts.length} orphaned connected account(s) in workspace ${workspaceId} after UserWorkspace hard-delete for member ${workspaceMemberId}`,
        );

        await this.connectedAccountRepository.delete(
          orphanedAccounts.map((account) => account.id),
        );
      }
    }, authContext);
  }
}
