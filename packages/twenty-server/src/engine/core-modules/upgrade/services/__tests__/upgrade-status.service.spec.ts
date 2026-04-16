import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UpgradeMigrationService } from 'src/engine/core-modules/upgrade/services/upgrade-migration.service';
import { UpgradeSequenceReaderService } from 'src/engine/core-modules/upgrade/services/upgrade-sequence-reader.service';
import { WorkspaceEntity } from 'src/engine/core-modules/workspace/workspace.entity';
import {
  UpgradeStatusService,
  deriveHealth,
  extractVersionFromCommandName,
} from 'src/engine/core-modules/upgrade/services/upgrade-status.service';

const LAST_INSTANCE_COMMAND = '1.23.0_LastInstanceCommand_1780000002000';
const LAST_WORKSPACE_COMMAND = '1.23.0_LastWorkspaceCommand_1780000003000';
const EARLIER_COMMAND = '1.22.0_EarlierCommand_1776000001000';

const MOCK_SEQUENCE = [
  { kind: 'fast-instance', name: EARLIER_COMMAND },
  { kind: 'fast-instance', name: LAST_INSTANCE_COMMAND },
  { kind: 'workspace', name: LAST_WORKSPACE_COMMAND },
];

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

describe('deriveHealth', () => {
  it('should return failed when migration status is failed', () => {
    expect(
      deriveHealth(
        { name: LAST_WORKSPACE_COMMAND, status: 'failed' },
        LAST_WORKSPACE_COMMAND,
      ),
    ).toBe('failed');
  });

  it('should return up-to-date when cursor matches last expected command', () => {
    expect(
      deriveHealth(
        { name: LAST_WORKSPACE_COMMAND, status: 'completed' },
        LAST_WORKSPACE_COMMAND,
      ),
    ).toBe('up-to-date');
  });

  it('should return behind when cursor is before last expected command', () => {
    expect(
      deriveHealth(
        { name: EARLIER_COMMAND, status: 'completed' },
        LAST_WORKSPACE_COMMAND,
      ),
    ).toBe('behind');
  });

  it('should return up-to-date when last expected command is null', () => {
    expect(
      deriveHealth(
        { name: EARLIER_COMMAND, status: 'completed' },
        null,
      ),
    ).toBe('up-to-date');
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
          provide: UpgradeSequenceReaderService,
          useValue: {
            getUpgradeSequence: () => MOCK_SEQUENCE,
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
    it('should return up-to-date when cursor is at last instance command', async () => {
      getLatestInstanceMigration.mockResolvedValue({
        name: LAST_INSTANCE_COMMAND,
        status: 'completed',
        executedByVersion: '1.23.0',
        errorMessage: null,
        createdAt: new Date('2025-06-01T00:00:00Z'),
      });

      const result = await service.getInstanceStatus();

      expect(result.health).toBe('up-to-date');
      expect(result.inferredVersion).toBe('1.23.0');
    });

    it('should return behind when cursor is before last instance command', async () => {
      getLatestInstanceMigration.mockResolvedValue({
        name: EARLIER_COMMAND,
        status: 'completed',
        executedByVersion: '1.22.0',
        errorMessage: null,
        createdAt: new Date('2025-06-01T00:00:00Z'),
      });

      const result = await service.getInstanceStatus();

      expect(result.health).toBe('behind');
      expect(result.inferredVersion).toBe('1.22.0');
    });

    it('should return failed when latest instance command failed', async () => {
      getLatestInstanceMigration.mockResolvedValue({
        name: LAST_INSTANCE_COMMAND,
        status: 'failed',
        executedByVersion: '1.23.0',
        errorMessage: 'column does not exist',
        createdAt: new Date('2025-06-01T01:00:00Z'),
      });

      const result = await service.getInstanceStatus();

      expect(result.health).toBe('failed');
      expect(result.latestCommand?.errorMessage).toBe(
        'column does not exist',
      );
    });

    it('should return behind when no migrations exist', async () => {
      getLatestInstanceMigration.mockResolvedValue(null);

      const result = await service.getInstanceStatus();

      expect(result.health).toBe('behind');
      expect(result.inferredVersion).toBeNull();
      expect(result.latestCommand).toBeNull();
    });
  });

  describe('getWorkspaceStatuses', () => {
    it('should return up-to-date for workspace at last command', async () => {
      workspaceFind.mockResolvedValue([
        { id: 'ws-1', displayName: 'Apple' },
      ]);

      getWorkspaceLastAttemptedCommandName.mockResolvedValue(
        new Map([
          [
            'ws-1',
            {
              workspaceId: 'ws-1',
              name: LAST_WORKSPACE_COMMAND,
              status: 'completed',
              executedByVersion: '1.23.0',
              errorMessage: null,
              createdAt: new Date('2025-06-01T00:00:00Z'),
            },
          ],
        ]),
      );

      const results = await service.getWorkspaceStatuses();

      expect(results).toHaveLength(1);
      expect(results[0].health).toBe('up-to-date');
    });

    it('should return behind for workspace not at last command', async () => {
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
              name: LAST_WORKSPACE_COMMAND,
              status: 'completed',
              executedByVersion: '1.23.0',
              errorMessage: null,
              createdAt: new Date('2025-06-01T00:00:00Z'),
            },
          ],
          [
            'ws-2',
            {
              workspaceId: 'ws-2',
              name: EARLIER_COMMAND,
              status: 'completed',
              executedByVersion: '1.22.0',
              errorMessage: null,
              createdAt: new Date('2025-05-01T00:00:00Z'),
            },
          ],
        ]),
      );

      const results = await service.getWorkspaceStatuses();

      expect(results).toHaveLength(2);
      expect(results[0].health).toBe('up-to-date');
      expect(results[1].health).toBe('behind');
    });

    it('should return behind for workspace with no migration history', async () => {
      workspaceFind.mockResolvedValue([
        { id: 'ws-1', displayName: 'Apple' },
      ]);

      getWorkspaceLastAttemptedCommandName.mockResolvedValue(new Map());

      const results = await service.getWorkspaceStatuses();

      expect(results).toHaveLength(1);
      expect(results[0].health).toBe('behind');
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
