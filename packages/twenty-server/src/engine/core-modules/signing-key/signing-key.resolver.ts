import { UseFilters, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { PermissionFlagType } from 'twenty-shared/constants';

import { MetadataResolver } from 'src/engine/api/graphql/graphql-config/decorators/metadata-resolver.decorator';
import { AuthGraphqlApiExceptionFilter } from 'src/engine/core-modules/auth/filters/auth-graphql-api-exception.filter';
import { SigningKeyEntity } from 'src/engine/core-modules/signing-key/signing-key.entity';
import { SigningKeyService } from 'src/engine/core-modules/signing-key/signing-key.service';
import { AdminPanelGuard } from 'src/engine/guards/admin-panel-guard';
import { SettingsPermissionGuard } from 'src/engine/guards/settings-permission.guard';
import { UserAuthGuard } from 'src/engine/guards/user-auth.guard';
import { WorkspaceAuthGuard } from 'src/engine/guards/workspace-auth.guard';

@MetadataResolver()
@UseFilters(AuthGraphqlApiExceptionFilter)
@UseGuards(
  WorkspaceAuthGuard,
  UserAuthGuard,
  SettingsPermissionGuard(PermissionFlagType.SECURITY),
)
@Resolver(() => SigningKeyEntity)
export class SigningKeyResolver {
  constructor(private readonly signingKeyService: SigningKeyService) {}

  @UseGuards(AdminPanelGuard)
  @Query(() => [SigningKeyEntity])
  async signingKeys(): Promise<SigningKeyEntity[]> {
    return this.signingKeyService.getAllKeys();
  }

  @UseGuards(AdminPanelGuard)
  @Mutation(() => SigningKeyEntity)
  async rotateSigningKey(): Promise<SigningKeyEntity> {
    return this.signingKeyService.rotateKey();
  }

  @UseGuards(AdminPanelGuard)
  @Mutation(() => SigningKeyEntity)
  async retireSigningKey(
    @Args('kid') kid: string,
  ): Promise<SigningKeyEntity> {
    const result = await this.signingKeyService.retireKey(kid);

    if (!result) {
      throw new Error(`Signing key with kid "${kid}" not found`);
    }

    return result;
  }
}
