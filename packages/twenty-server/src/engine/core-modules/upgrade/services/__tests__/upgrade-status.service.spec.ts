import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UpgradeMigrationEntity } from 'src/engine/core-modules/upgrade/upgrade-migration.entity';
import { WorkspaceEntity } from 'src/engine/core-modules/workspace/workspace.entity';
import {
  UpgradeStatusService,
  extractVersionFromCommandName,
} from 'src/engine/core-modules/upgrade/services/upgrade-status.service';

const buildMigrationEntity = (
  overrides: Partial<UpgradeMigrationEntity>,
): UpgradeMigrationEntity =>
  ({
    id: 'some-uuid',
    name: '',
    status: 'completed',
    attempt: 1,
    executedByVersion: '1.21.0',
    errorMessage: null,
    workspaceId: null,
    workspace: null,
    createdAt: new Date('2025-01-01T00:00:00Z'),
    ...overrides,
  }) as UpgradeMigrationEntity;

describe('extractVersionFromCommandName', () => {
  it('should extract version from standard command name', () => {
    expect(
      extractVersionFromCommandName(
        '1.21.0_BackfillDatasourceCommand_1775500003000',
      ),
    ).toBe('1.21.0');
  });

  it('should extract version with different version numbers', () => {
    expect(
      extractVersionFromCommandName(
        '1.22.0_SomeCommand_1780000001000',
      ),
    ).toBe('1.22.0');
  });

  it('should return null for names without underscores', () => {
    expect(extractVersionFromCommandName('nounderscores')).toBeNull();
  });

  it('should handle empty string', () => {
    expect(extractVersionFromCommandName('')).toBeNull();
  });
});

describe('UpgradeStatusService', () => {
  let service: UpgradeStatusService;
  let upgradeMigrationFindOne: jest.Mock;
  let workspaceFind: jest.Mock;

  beforeEach(async () => {
    upgradeMigrationFindOne = jest.fn();
    workspaceFind = jest.fn();

    const module = await Test.createTestingModule({
      providers: [
        UpgradeStatusService,
        {
          provide: getRepositoryToken(UpgradeMigrationEntity),
          useValue: { findOne: upgradeMigrationFindOne },
        },
        {
          provide: getRepositoryToken(WorkspaceEntity),
          useValue: { find: workspaceFind },
        },
      ],
    }).compile();

    service = module.get(UpgradeStatusService);
  });

  describe('getInstanceStatus', () => {
    it('should return inferred version from latest completed instance command', async () => {
      const completedMigration = buildMigrationEntity({
        name: '1.21.0_SomeCommand_1775500003000',
        status: 'completed',
        createdAt: new Date('2025-06-01T00:00:00Z'),
      });

      upgradeMigrationFindOne
        .mockResolvedValueOnce(completedMigration)
        .mockResolvedValueOnce(completedMigration);

      const result = await service.getInstanceStatus();

      expect(result.inferredVersion).toBe('1.21.0');
      expect(result.latestCompletedCommand).toBe(
        '1.21.0_SomeCommand_1775500003000',
      );
      expect(result.lastFailure).toBeNull();
    });

    it('should report last failure when most recent command failed', async () => {
      const completedMigration = buildMigrationEntity({
        name: '1.21.0_FirstCommand_1775500001000',
        status: 'completed',
        createdAt: new Date('2025-06-01T00:00:00Z'),
      });

      const failedMigration = buildMigrationEntity({
        name: '1.21.0_SecondCommand_1775500002000',
        status: 'failed',
        errorMessage: 'column does not exist',
        executedByVersion: '1.21.0',
        createdAt: new Date('2025-06-01T01:00:00Z'),
      });

      upgradeMigrationFindOne
        .mockResolvedValueOnce(completedMigration)
        .mockResolvedValueOnce(failedMigration);

      const result = await service.getInstanceStatus();

      expect(result.inferredVersion).toBe('1.21.0');
      expect(result.lastFailure).toEqual({
        name: '1.21.0_SecondCommand_1775500002000',
        errorMessage: 'column does not exist',
        executedByVersion: '1.21.0',
        createdAt: failedMigration.createdAt,
      });
    });

    it('should return nulls when no migrations exist', async () => {
      upgradeMigrationFindOne
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(null);

      const result = await service.getInstanceStatus();

      expect(result.inferredVersion).toBeNull();
      expect(result.latestCompletedCommand).toBeNull();
      expect(result.latestCompletedAt).toBeNull();
      expect(result.lastFailure).toBeNull();
    });
  });

  describe('getWorkspaceStatuses', () => {
    it('should return status for each active workspace', async () => {
      workspaceFind.mockResolvedValue([
        { id: 'ws-1', version: '1.21.0', displayName: 'Apple' },
        { id: 'ws-2', version: '1.20.0', displayName: 'Google' },
      ]);

      const completedMigrationWs1 = buildMigrationEntity({
        name: '1.21.0_SomeCommand_1775500003000',
        status: 'completed',
        workspaceId: 'ws-1',
        createdAt: new Date('2025-06-01T00:00:00Z'),
      });

      const completedMigrationWs2 = buildMigrationEntity({
        name: '1.20.0_OldCommand_1770000001000',
        status: 'completed',
        workspaceId: 'ws-2',
        createdAt: new Date('2025-05-01T00:00:00Z'),
      });

      upgradeMigrationFindOne
        .mockResolvedValueOnce(completedMigrationWs1)
        .mockResolvedValueOnce(completedMigrationWs1)
        .mockResolvedValueOnce(completedMigrationWs2)
        .mockResolvedValueOnce(completedMigrationWs2);

      const results = await service.getWorkspaceStatuses();

      expect(results).toHaveLength(2);

      expect(results[0].workspaceId).toBe('ws-1');
      expect(results[0].displayName).toBe('Apple');
      expect(results[0].storedVersion).toBe('1.21.0');
      expect(results[0].inferredVersion).toBe('1.21.0');

      expect(results[1].workspaceId).toBe('ws-2');
      expect(results[1].displayName).toBe('Google');
      expect(results[1].storedVersion).toBe('1.20.0');
      expect(results[1].inferredVersion).toBe('1.20.0');
    });

    it('should filter by workspace ID when provided', async () => {
      workspaceFind.mockResolvedValue([
        { id: 'ws-1', version: '1.21.0', displayName: 'Apple' },
      ]);

      const completedMigration = buildMigrationEntity({
        name: '1.21.0_SomeCommand_1775500003000',
        status: 'completed',
        workspaceId: 'ws-1',
      });

      upgradeMigrationFindOne
        .mockResolvedValueOnce(completedMigration)
        .mockResolvedValueOnce(completedMigration);

      const results = await service.getWorkspaceStatuses('ws-1');

      expect(results).toHaveLength(1);
      expect(results[0].workspaceId).toBe('ws-1');

      expect(workspaceFind).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            id: 'ws-1',
          }),
        }),
      );
    });

    it('should return empty array when no workspaces exist', async () => {
      workspaceFind.mockResolvedValue([]);

      const results = await service.getWorkspaceStatuses();

      expect(results).toHaveLength(0);
    });
  });
});
