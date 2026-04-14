import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { WorkspaceActivationStatus } from 'twenty-shared/workspace';
import { In, IsNull, Repository } from 'typeorm';

import { UpgradeMigrationEntity } from 'src/engine/core-modules/upgrade/upgrade-migration.entity';
import { WorkspaceEntity } from 'src/engine/core-modules/workspace/workspace.entity';

export type MigrationCursorStatus = {
  inferredVersion: string | null;
  latestCompletedCommand: string | null;
  latestCompletedAt: Date | null;
  lastFailure: {
    name: string;
    errorMessage: string | null;
    executedByVersion: string;
    createdAt: Date;
  } | null;
};

export type InstanceStatus = MigrationCursorStatus;

export type WorkspaceStatus = MigrationCursorStatus & {
  workspaceId: string;
  displayName: string | null;
  storedVersion: string | null;
};

@Injectable()
export class UpgradeStatusService {
  constructor(
    @InjectRepository(UpgradeMigrationEntity)
    private readonly upgradeMigrationRepository: Repository<UpgradeMigrationEntity>,
    @InjectRepository(WorkspaceEntity)
    private readonly workspaceRepository: Repository<WorkspaceEntity>,
  ) {}

  async getInstanceStatus(): Promise<InstanceStatus> {
    return this.buildCursorStatus(null);
  }

  async getWorkspaceStatuses(workspaceId?: string): Promise<WorkspaceStatus[]> {
    const workspaces = await this.loadWorkspaces(workspaceId);
    const statuses: WorkspaceStatus[] = [];

    for (const workspace of workspaces) {
      const cursorStatus = await this.buildCursorStatus(workspace.id);

      statuses.push({
        ...cursorStatus,
        workspaceId: workspace.id,
        displayName: workspace.displayName ?? null,
        storedVersion: workspace.version ?? null,
      });
    }

    return statuses;
  }

  private async buildCursorStatus(
    workspaceId: string | null,
  ): Promise<MigrationCursorStatus> {
    const whereClause =
      workspaceId === null ? { workspaceId: IsNull() } : { workspaceId };

    const latestCompleted = await this.upgradeMigrationRepository.findOne({
      where: { ...whereClause, status: 'completed' },
      order: { createdAt: 'DESC' },
    });

    const mostRecent = await this.upgradeMigrationRepository.findOne({
      where: whereClause,
      order: { createdAt: 'DESC' },
    });

    const lastFailure =
      mostRecent?.status === 'failed'
        ? {
            name: mostRecent.name,
            errorMessage: mostRecent.errorMessage,
            executedByVersion: mostRecent.executedByVersion,
            createdAt: mostRecent.createdAt,
          }
        : null;

    return {
      inferredVersion: latestCompleted
        ? extractVersionFromCommandName(latestCompleted.name)
        : null,
      latestCompletedCommand: latestCompleted?.name ?? null,
      latestCompletedAt: latestCompleted?.createdAt ?? null,
      lastFailure,
    };
  }

  private async loadWorkspaces(
    workspaceId?: string,
  ): Promise<Pick<WorkspaceEntity, 'id' | 'version' | 'displayName'>[]> {
    return this.workspaceRepository.find({
      select: ['id', 'version', 'displayName'],
      where: {
        ...(workspaceId ? { id: workspaceId } : {}),
        activationStatus: In([
          WorkspaceActivationStatus.ACTIVE,
          WorkspaceActivationStatus.SUSPENDED,
        ]),
      },
      order: { id: 'ASC' },
    });
  }
}

// We could store the version in database directly
export const extractVersionFromCommandName = (name: string): string | null => {
  const firstUnderscore = name.indexOf('_');

  if (firstUnderscore === -1) {
    return null;
  }

  return name.substring(0, firstUnderscore);
};
