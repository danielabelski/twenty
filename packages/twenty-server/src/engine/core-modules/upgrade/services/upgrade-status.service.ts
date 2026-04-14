import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { WorkspaceActivationStatus } from 'twenty-shared/workspace';
import { In, Repository } from 'typeorm';

import { type UpgradeMigrationStatus } from 'src/engine/core-modules/upgrade/upgrade-migration.entity';
import { UpgradeMigrationService } from 'src/engine/core-modules/upgrade/services/upgrade-migration.service';
import { WorkspaceEntity } from 'src/engine/core-modules/workspace/workspace.entity';

export type MigrationCursorStatus = {
  inferredVersion: string | null;
  latestCommand: {
    name: string;
    status: UpgradeMigrationStatus;
    executedByVersion: string;
    errorMessage: string | null;
    createdAt: Date;
  } | null;
};

export type InstanceStatus = MigrationCursorStatus;

export type WorkspaceStatus = MigrationCursorStatus & {
  workspaceId: string;
  displayName: string | null;
};

@Injectable()
export class UpgradeStatusService {
  constructor(
    private readonly upgradeMigrationService: UpgradeMigrationService,
    @InjectRepository(WorkspaceEntity)
    private readonly workspaceRepository: Repository<WorkspaceEntity>,
  ) {}

  async getInstanceStatus(): Promise<InstanceStatus> {
    const migration =
      await this.upgradeMigrationService.getLatestInstanceMigration();

    return this.buildCursorStatusFromMigration(migration);
  }

  async getWorkspaceStatuses(
    workspaceId?: string,
  ): Promise<WorkspaceStatus[]> {
    const workspaces = await this.loadWorkspaces(workspaceId);

    const workspaceIds = workspaces.map((workspace) => workspace.id);
    const cursors =
      await this.upgradeMigrationService.getWorkspaceLastAttemptedCommandName(
        workspaceIds,
      );

    return workspaces.map((workspace) => ({
      ...this.buildCursorStatusFromMigration(
        cursors.get(workspace.id) ?? null,
      ),
      workspaceId: workspace.id,
      displayName: workspace.displayName ?? null,
    }));
  }

  private buildCursorStatusFromMigration(
    migration: {
      name: string;
      status: UpgradeMigrationStatus;
      executedByVersion: string;
      errorMessage: string | null;
      createdAt: Date;
    } | null,
  ): MigrationCursorStatus {
    if (!migration) {
      return { inferredVersion: null, latestCommand: null };
    }

    return {
      inferredVersion: extractVersionFromCommandName(migration.name),
      latestCommand: {
        name: migration.name,
        status: migration.status,
        executedByVersion: migration.executedByVersion,
        errorMessage: migration.errorMessage,
        createdAt: migration.createdAt,
      },
    };
  }

  private async loadWorkspaces(
    workspaceId?: string,
  ): Promise<Pick<WorkspaceEntity, 'id' | 'displayName'>[]> {
    return this.workspaceRepository.find({
      select: ['id', 'displayName'],
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

export const extractVersionFromCommandName = (name: string): string | null => {
  const firstUnderscore = name.indexOf('_');

  if (firstUnderscore === -1) {
    return null;
  }

  return name.substring(0, firstUnderscore);
};
