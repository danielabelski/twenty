import {
  Injectable,
  type CanActivate,
  type ExecutionContext,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { msg } from '@lingui/core/macro';
import { PermissionFlagType } from 'twenty-shared/constants';
import { WorkspaceActivationStatus } from 'twenty-shared/workspace';

import {
  PermissionsException,
  PermissionsExceptionCode,
  PermissionsExceptionMessage,
} from 'src/engine/metadata-modules/permissions/permissions.exception';
import { PermissionsService } from 'src/engine/metadata-modules/permissions/permissions.service';

// Guard for the admin panel resolver that allows server-level admins
// (canAccessFullAdminPanel or canImpersonate) to bypass the workspace-level
// SECURITY permission check. Non-admin users fall back to the standard
// workspace role permission check.
@Injectable()
export class AdminPanelSecurityGuard implements CanActivate {
  constructor(private readonly permissionsService: PermissionsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    if (
      request.user.canAccessFullAdminPanel === true ||
      request.user.canImpersonate === true
    ) {
      return true;
    }

    const workspaceId = request.workspace.id;
    const userWorkspaceId = request.userWorkspaceId;
    const workspaceActivationStatus = request.workspace.activationStatus;

    if (
      [
        WorkspaceActivationStatus.PENDING_CREATION,
        WorkspaceActivationStatus.ONGOING_CREATION,
      ].includes(workspaceActivationStatus)
    ) {
      return true;
    }

    const hasPermission =
      await this.permissionsService.userHasWorkspaceSettingPermission({
        userWorkspaceId,
        setting: PermissionFlagType.SECURITY,
        workspaceId,
        apiKeyId: request.apiKey?.id,
        applicationId: request.application?.id,
      });

    if (hasPermission === true) {
      return true;
    }

    throw new PermissionsException(
      PermissionsExceptionMessage.PERMISSION_DENIED,
      PermissionsExceptionCode.PERMISSION_DENIED,
      {
        userFriendlyMessage: msg`You do not have permission to access this feature. Please contact your workspace administrator for access.`,
      },
    );
  }
}
