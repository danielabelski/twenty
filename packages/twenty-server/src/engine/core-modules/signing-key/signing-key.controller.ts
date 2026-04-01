import { Controller, Get, UseGuards } from '@nestjs/common';

import { NoPermissionGuard } from 'src/engine/guards/no-permission.guard';
import { PublicEndpointGuard } from 'src/engine/guards/public-endpoint.guard';
import { SigningKeyService } from 'src/engine/core-modules/signing-key/signing-key.service';

@Controller('.well-known')
export class SigningKeyDiscoveryController {
  constructor(private readonly signingKeyService: SigningKeyService) {}

  @Get('jwks.json')
  @UseGuards(PublicEndpointGuard, NoPermissionGuard)
  async getJwks() {
    if (!this.signingKeyService.isAsymmetricSigningEnabled()) {
      return { keys: [] };
    }

    const activeKeys = await this.signingKeyService.getAllActivePublicKeys();

    const jwks = activeKeys.map((key) =>
      this.signingKeyService.getPublicKeyAsJwk(key.publicKey, key.kid),
    );

    return { keys: jwks };
  }
}
