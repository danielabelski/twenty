import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UpgradeMigrationService } from 'src/engine/core-modules/upgrade/services/upgrade-migration.service';
import { WorkspaceEntity } from 'src/engine/core-modules/workspace/workspace.entity';
import {
  UpgradeStatusService,
  extractVersionFromCommandName,
} from 'src/engine/core-modules/upgrade/services/upgrade-status.service';

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
      extractVersionFromCommandName('1.22.0_SomeCommand_1780000001000'),
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
  let getLatestInstanceMigration: jest.Mock;
  let getWorkspaceLastAttemptedCommandName: jest.Mock;
  let workspaceFind: jest.Mock;

  beforeEach(async () => {
    getLatestInstanceMigration = jest.fn();
    getWorkspaceLastAttemptedCommandName = jest.fn();
    workspaceFind = jest.fn();

    const module = await Test.createTestingModule({
      providers: [
        UpgradeStatusService,
        {
          provide: UpgradeMigrationService,
          useValue: {
            getLatestInstanceMigration,
            getWorkspaceLastAttemptedCommandName,
          },
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
      getLatestInstanceMigration.mockResolvedValue({
        name: '1.21.0_SomeCommand_1775500003000',
        status: 'completed',
        executedByVersion: '1.21.0',
        errorMessage: null,
        createdAt: new Date('2025-06-01T00:00:00Z'),
      });

      const result = await service.getInstanceStatus();

      expect(result.inferredVersion).toBe('1.21.0');
      expect(result.latestCommand).toEqual(
        expect.objectContaining({
          name: '1.21.0_SomeCommand_1775500003000',
          status: 'completed',
        }),
      );
    });

    it('should report failure when most recent command failed', async () => {
      getLatestInstanceMigration.mockResolvedValue({
        name: '1.21.0_SecondCommand_1775500002000',
        status: 'failed',
        executedByVersion: '1.21.0',
        errorMessage: 'column does not exist',
        createdAt: new Date('2025-06-01T01:00:00Z'),
      });

      const result = await service.getInstanceStatus();

      expect(result.inferredVersion).toBe('1.21.0');
      expect(result.latestCommand?.status).toBe('failed');
      expect(result.latestCommand?.errorMessage).toBe(
        'column does not exist',
      );
    });

    it('should return nulls when no migrations exist', async () => {
      getLatestInstanceMigration.mockResolvedValue(null);

      const result = await service.getInstanceStatus();

      expect(result.inferredVersion).toBeNull();
      expect(result.latestCommand).toBeNull();
    });
  });

  describe('getWorkspaceStatuses', () => {
    it('should return status for each active workspace', async () => {
      workspaceFind.mockResolvedValue([
        { id: 'ws-1', displayName: 'Apple' },
        { id: 'ws-2', displayName: 'Google' },
      ]);

      getWorkspaceLastAttemptedCommandName.mockResolvedValue(
        new Map([
          [
            'ws-1',
            {
              workspaceId: 'ws-1',
              name: '1.21.0_SomeCommand_1775500003000',
              status: 'completed',
              executedByVersion: '1.21.0',
              errorMessage: null,
              createdAt: new Date('2025-06-01T00:00:00Z'),
            },
          ],
          [
            'ws-2',
            {
              workspaceId: 'ws-2',
              name: '1.20.0_OldCommand_1770000001000',
              status: 'completed',
              executedByVersion: '1.20.0',
              errorMessage: null,
              createdAt: new Date('2025-05-01T00:00:00Z'),
            },
          ],
        ]),
      );

      const results = await service.getWorkspaceStatuses();

      expect(results).toHaveLength(2);

      expect(results[0].workspaceId).toBe('ws-1');
      expect(results[0].displayName).toBe('Apple');
      expect(results[0].inferredVersion).toBe('1.21.0');

      expect(results[1].workspaceId).toBe('ws-2');
      expect(results[1].displayName).toBe('Google');
      expect(results[1].inferredVersion).toBe('1.20.0');
    });

    it('should filter by workspace ID when provided', async () => {
      workspaceFind.mockResolvedValue([
        { id: 'ws-1', displayName: 'Apple' },
      ]);

      getWorkspaceLastAttemptedCommandName.mockResolvedValue(
        new Map([
          [
            'ws-1',
            {
              workspaceId: 'ws-1',
              name: '1.21.0_SomeCommand_1775500003000',
              status: 'completed',
              executedByVersion: '1.21.0',
              errorMessage: null,
              createdAt: new Date('2025-06-01T00:00:00Z'),
            },
          ],
        ]),
      );

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

    it('should handle workspace with no migration history', async () => {
      workspaceFind.mockResolvedValue([
        { id: 'ws-1', displayName: 'Apple' },
      ]);

      getWorkspaceLastAttemptedCommandName.mockResolvedValue(new Map());

      const results = await service.getWorkspaceStatuses();

      expect(results).toHaveLength(1);
      expect(results[0].inferredVersion).toBeNull();
      expect(results[0].latestCommand).toBeNull();
    });

    it('should return empty array when no workspaces exist', async () => {
      workspaceFind.mockResolvedValue([]);
      getWorkspaceLastAttemptedCommandName.mockResolvedValue(new Map());

      const results = await service.getWorkspaceStatuses();

      expect(results).toHaveLength(0);
    });
  });
});
