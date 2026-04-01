import { Injectable, Logger, type OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { createHash, createPublicKey, generateKeyPairSync } from 'crypto';

import { IsNull, Not, Repository } from 'typeorm';

import { EnterprisePlanService } from 'src/engine/core-modules/enterprise/services/enterprise-plan.service';
import { SigningKeyEntity } from 'src/engine/core-modules/signing-key/signing-key.entity';
import { TwentyConfigService } from 'src/engine/core-modules/twenty-config/twenty-config.service';

export type CachedSigningKey = {
  kid: string;
  privateKey: string;
  publicKey: string;
};

@Injectable()
export class SigningKeyService implements OnModuleInit {
  private readonly logger = new Logger(SigningKeyService.name);
  private publicKeyCache = new Map<string, string>();
  private currentSigningKey: CachedSigningKey | null = null;

  constructor(
    @InjectRepository(SigningKeyEntity)
    private readonly signingKeyRepository: Repository<SigningKeyEntity>,
    private readonly twentyConfigService: TwentyConfigService,
    private readonly enterprisePlanService: EnterprisePlanService,
  ) {}

  async onModuleInit(): Promise<void> {
    if (!this.isAsymmetricSigningEnabled()) {
      return;
    }

    const existingKey = await this.signingKeyRepository.findOne({
      where: { privateKey: Not(IsNull()), isActive: true },
    });

    if (!existingKey) {
      this.logger.log(
        'Asymmetric signing enabled but no active key found — generating first key pair',
      );
      await this.generateAndStoreKeyPair();
    } else {
      this.warmCache(existingKey);
    }

    await this.warmPublicKeyCache();
  }

  isAsymmetricSigningEnabled(): boolean {
    return (
      this.twentyConfigService.get('IS_ASYMMETRIC_SIGNING_ENABLED') === true &&
      this.enterprisePlanService.hasValidEnterpriseKey()
    );
  }

  async getCurrentSigningKey(): Promise<CachedSigningKey | null> {
    if (this.currentSigningKey) {
      return this.currentSigningKey;
    }

    const key = await this.signingKeyRepository.findOne({
      where: { privateKey: Not(IsNull()), isActive: true },
    });

    if (!key || !key.privateKey) {
      return null;
    }

    this.warmCache(key);

    return this.currentSigningKey;
  }

  async getPublicKeyByKid(kid: string): Promise<string | null> {
    const cached = this.publicKeyCache.get(kid);

    if (cached) {
      return cached;
    }

    // Cache miss — query DB
    const key = await this.signingKeyRepository.findOne({
      where: { kid, retiredAt: IsNull() },
    });

    if (!key) {
      return null;
    }

    this.publicKeyCache.set(kid, key.publicKey);

    return key.publicKey;
  }

  async rotateKey(): Promise<SigningKeyEntity> {
    const currentKey = await this.signingKeyRepository.findOne({
      where: { privateKey: Not(IsNull()), isActive: true },
    });

    if (currentKey) {
      currentKey.privateKey = null;
      currentKey.rotatedAt = new Date();
      await this.signingKeyRepository.save(currentKey);
    }

    const newKey = await this.generateAndStoreKeyPair();

    this.logger.log(`Signing key rotated — new kid: ${newKey.kid}`);

    return newKey;
  }

  async retireKey(kid: string): Promise<SigningKeyEntity | null> {
    const key = await this.signingKeyRepository.findOne({
      where: { kid },
    });

    if (!key) {
      return null;
    }

    key.privateKey = null;
    key.isActive = false;
    key.retiredAt = new Date();
    key.rotatedAt = key.rotatedAt ?? new Date();
    await this.signingKeyRepository.save(key);

    this.publicKeyCache.delete(kid);

    if (this.currentSigningKey?.kid === kid) {
      this.currentSigningKey = null;
    }

    return key;
  }

  async getAllActivePublicKeys(): Promise<SigningKeyEntity[]> {
    return this.signingKeyRepository.find({
      where: { retiredAt: IsNull() },
      order: { createdAt: 'DESC' },
    });
  }

  async getAllKeys(): Promise<SigningKeyEntity[]> {
    return this.signingKeyRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  getPublicKeyAsJwk(publicKeyPem: string, kid: string): Record<string, string> {
    const keyObject = createPublicKey(publicKeyPem);
    const jwk = keyObject.export({ format: 'jwk' });

    return {
      ...jwk,
      kid,
      use: 'sig',
      alg: 'ES256',
    };
  }

  private async generateAndStoreKeyPair(): Promise<SigningKeyEntity> {
    const { publicKey, privateKey } = generateKeyPairSync('ec', {
      namedCurve: 'P-256',
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    });

    const kid = createHash('sha256')
      .update(publicKey)
      .digest('hex')
      .substring(0, 12);

    const entity = this.signingKeyRepository.create({
      kid,
      publicKey,
      privateKey,
      algorithm: 'ES256',
      isActive: true,
    });

    const saved = await this.signingKeyRepository.save(entity);

    this.warmCache(saved);
    this.publicKeyCache.set(kid, publicKey);

    return saved;
  }

  private warmCache(key: SigningKeyEntity): void {
    if (key.privateKey) {
      this.currentSigningKey = {
        kid: key.kid,
        privateKey: key.privateKey,
        publicKey: key.publicKey,
      };
    }
  }

  private async warmPublicKeyCache(): Promise<void> {
    const keys = await this.signingKeyRepository.find({
      where: { retiredAt: IsNull() },
    });

    for (const key of keys) {
      this.publicKeyCache.set(key.kid, key.publicKey);
    }
  }
}
