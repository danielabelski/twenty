import { Injectable } from '@nestjs/common';
import {
  JwtService,
  type JwtSignOptions,
  type JwtVerifyOptions,
} from '@nestjs/jwt';

import { createHash } from 'crypto';

import { type Request as ExpressRequest } from 'express';
import * as jwt from 'jsonwebtoken';
import { ExtractJwt, type JwtFromRequestFunction } from 'passport-jwt';
import { isDefined } from 'twenty-shared/utils';

import {
  AuthException,
  AuthExceptionCode,
} from 'src/engine/core-modules/auth/auth.exception';
import {
  type JwtPayload,
  JwtTokenTypeEnum,
} from 'src/engine/core-modules/auth/types/auth-context.type';
import { SigningKeyService } from 'src/engine/core-modules/signing-key/signing-key.service';
import { TwentyConfigService } from 'src/engine/core-modules/twenty-config/twenty-config.service';

@Injectable()
export class JwtWrapperService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly twentyConfigService: TwentyConfigService,
    private readonly signingKeyService: SigningKeyService,
  ) {}

  async sign(payload: JwtPayload, options?: JwtSignOptions): Promise<string> {
    if (this.signingKeyService.isAsymmetricSigningEnabled()) {
      const signingKey =
        await this.signingKeyService.getCurrentSigningKey();

      if (signingKey) {
        return jwt.sign(payload as object, signingKey.privateKey, {
          algorithm: 'ES256',
          keyid: signingKey.kid,
          expiresIn: options?.expiresIn,
          jwtid: options?.jwtid,
        });
      }
    }

    // Fallback: existing HS256 path
    return this.jwtService.sign(payload, options);
  }

  // oxlint-disable-next-line @typescripttypescript/no-explicit-any
  verify<T extends object = any>(
    token: string,
    options?: { secret: string },
  ): T {
    return this.jwtService.verify(token, options);
  }

  // oxlint-disable-next-line @typescripttypescript/no-explicit-any
  decode<T = any>(payload: string, options?: jwt.DecodeOptions): T {
    return this.jwtService.decode(payload, options);
  }

  async verifyJwtToken(token: string, options?: JwtVerifyOptions) {
    // Check for kid header — if present, use asymmetric verification
    const decoded = jwt.decode(token, { complete: true });

    if (decoded?.header?.kid) {
      return this.verifyAsymmetricToken(token, decoded.header.kid);
    }

    // Fallback: existing HS256 verification path
    return this.verifySymmetricToken(token, options);
  }

  generateAppSecret(type: JwtTokenTypeEnum, appSecretBody: string): string {
    const appSecret = this.twentyConfigService.get('APP_SECRET');

    if (!appSecret) {
      throw new Error('APP_SECRET is not set');
    }

    return createHash('sha256')
      .update(`${appSecret}${appSecretBody}${type}`)
      .digest('hex');
  }

  async getVerificationKeyForToken(
    rawJwtToken: string,
  ): Promise<string | null> {
    const decoded = jwt.decode(rawJwtToken, { complete: true });

    if (decoded?.header?.kid) {
      return this.signingKeyService.getPublicKeyByKid(decoded.header.kid);
    }

    return null;
  }

  extractJwtFromRequest(): JwtFromRequestFunction {
    return (request: ExpressRequest) => {
      const tokenFromHeader = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

      if (tokenFromHeader) {
        return tokenFromHeader;
      }

      return ExtractJwt.fromUrlQueryParameter('token')(request);
    };
  }

  private async verifyAsymmetricToken(token: string, kid: string) {
    const publicKey = await this.signingKeyService.getPublicKeyByKid(kid);

    if (!publicKey) {
      throw new AuthException(
        'Unknown signing key.',
        AuthExceptionCode.UNAUTHENTICATED,
      );
    }

    try {
      return jwt.verify(token, publicKey, { algorithms: ['ES256'] });
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new AuthException(
          'Token has expired.',
          AuthExceptionCode.UNAUTHENTICATED,
        );
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new AuthException(
          'Token invalid.',
          AuthExceptionCode.UNAUTHENTICATED,
        );
      }
      throw new AuthException(
        'Unknown token error.',
        AuthExceptionCode.INVALID_INPUT,
      );
    }
  }

  private verifySymmetricToken(token: string, options?: JwtVerifyOptions) {
    const payload = this.decode<JwtPayload>(token, {
      json: true,
    });

    if (!isDefined(payload)) {
      throw new AuthException('No payload', AuthExceptionCode.UNAUTHENTICATED);
    }

    const type = payload.type;

    const appSecretBody =
      'workspaceId' in payload
        ? payload.workspaceId
        : 'userId' in payload
          ? payload.userId
          : undefined;

    if (!isDefined(appSecretBody)) {
      throw new AuthException(
        'Invalid token type',
        AuthExceptionCode.INVALID_JWT_TOKEN_TYPE,
      );
    }

    try {
      // API_KEY tokens created before 12/12/2025 were accidentally signed
      // with ACCESS type instead of API_KEY. Try the correct secret first,
      // fall back to the old one for backward compatibility.
      // See https://github.com/twentyhq/twenty/pull/16504
      if (type === JwtTokenTypeEnum.API_KEY) {
        try {
          return this.jwtService.verify(token, {
            ...options,
            secret: this.generateAppSecret(type, appSecretBody),
          });
        } catch {
          return this.jwtService.verify(token, {
            ...options,
            secret: this.generateAppSecret(
              JwtTokenTypeEnum.ACCESS,
              appSecretBody,
            ),
          });
        }
      }

      return this.jwtService.verify(token, {
        ...options,
        secret: this.generateAppSecret(type, appSecretBody),
      });
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new AuthException(
          'Token has expired.',
          AuthExceptionCode.UNAUTHENTICATED,
        );
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new AuthException(
          'Token invalid.',
          AuthExceptionCode.UNAUTHENTICATED,
        );
      }
      throw new AuthException(
        'Unknown token error.',
        AuthExceptionCode.INVALID_INPUT,
      );
    }
  }
}
