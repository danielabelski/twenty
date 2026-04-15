import { type ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { PermissionFlagType } from 'twenty-shared/constants';
import { WorkspaceActivationStatus } from 'twenty-shared/workspace';

import { AdminPanelSecurityGuard } from 'src/engine/guards/admin-panel-security.guard';
import { PermissionsException } from 'src/engine/metadata-modules/permissions/permissions.exception';
import { type PermissionsService } from 'src/engine/metadata-modules/permissions/permissions.service';

describe('AdminPanelSecurityGuard', () => {
  let guard: AdminPanelSecurityGuard;
  let mockPermissionsService: jest.Mocked<PermissionsService>;
  let mockExecutionContext: ExecutionContext;
  let mockGqlContext: any;

  beforeEach(() => {
    mockPermissionsService = {
      userHasWorkspaceSettingPermission: jest.fn(),
    } as any;

    mockGqlContext = {
      req: {
        workspace: {
          id: 'workspace-id',
          activationStatus: WorkspaceActivationStatus.ACTIVE,
        },
        userWorkspaceId: 'user-workspace-id',
        user: {
          canAccessFullAdminPanel: false,
          canImpersonate: false,
        },
        apiKey: null,
        application: null,
      },
    };

    mockExecutionContext = {} as ExecutionContext;

    jest
      .spyOn(GqlExecutionContext, 'create')
      .mockReturnValue({ getContext: () => mockGqlContext } as any);

    guard = new AdminPanelSecurityGuard(mockPermissionsService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should allow access when user has canAccessFullAdminPanel', async () => {
    mockGqlContext.req.user.canAccessFullAdminPanel = true;

    const result = await guard.canActivate(mockExecutionContext);

    expect(result).toBe(true);
    expect(
      mockPermissionsService.userHasWorkspaceSettingPermission,
    ).not.toHaveBeenCalled();
  });

  it('should allow access when user has canImpersonate', async () => {
    mockGqlContext.req.user.canImpersonate = true;

    const result = await guard.canActivate(mockExecutionContext);

    expect(result).toBe(true);
    expect(
      mockPermissionsService.userHasWorkspaceSettingPermission,
    ).not.toHaveBeenCalled();
  });

  it('should bypass permission check when workspace is being created', async () => {
    mockGqlContext.req.workspace.activationStatus =
      WorkspaceActivationStatus.PENDING_CREATION;

    const result = await guard.canActivate(mockExecutionContext);

    expect(result).toBe(true);
    expect(
      mockPermissionsService.userHasWorkspaceSettingPermission,
    ).not.toHaveBeenCalled();
  });

  it('should allow access when user has SECURITY workspace permission', async () => {
    mockPermissionsService.userHasWorkspaceSettingPermission.mockResolvedValue(
      true,
    );

    const result = await guard.canActivate(mockExecutionContext);

    expect(result).toBe(true);
    expect(
      mockPermissionsService.userHasWorkspaceSettingPermission,
    ).toHaveBeenCalledWith({
      userWorkspaceId: 'user-workspace-id',
      setting: PermissionFlagType.SECURITY,
      workspaceId: 'workspace-id',
      apiKeyId: undefined,
      applicationId: undefined,
    });
  });

  it('should throw PermissionsException when user lacks all permissions', async () => {
    mockPermissionsService.userHasWorkspaceSettingPermission.mockResolvedValue(
      false,
    );

    await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
      PermissionsException,
    );
  });
});
