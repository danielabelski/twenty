import { JwtService } from '@nestjs/jwt';
import { Test, type TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import * as jwt from 'jsonwebtoken';

import { AuthException } from 'src/engine/core-modules/auth/auth.exception';
import { JwtWrapperService } from 'src/engine/core-modules/jwt/services/jwt-wrapper.service';
import { SigningKeyEntity } from 'src/engine/core-modules/signing-key/signing-key.entity';
import { SigningKeyService } from 'src/engine/core-modules/signing-key/signing-key.service';
import { TwentyConfigService } from 'src/engine/core-modules/twenty-config/twenty-config.service';
import { EnterprisePlanService } from 'src/engine/core-modules/enterprise/services/enterprise-plan.service';

// In-memory store that simulates the DB repository
class InMemorySigningKeyRepository {
  private store: SigningKeyEntity[] = [];
  private idCounter = 0;

  create(data: Partial<SigningKeyEntity>): SigningKeyEntity {
    return { ...data } as SigningKeyEntity;
  }

  async save(entity: SigningKeyEntity): Promise<SigningKeyEntity> {
    const existing = this.store.find((e) => e.id === entity.id);

    if (existing) {
      Object.assign(existing, entity);

      return existing;
    }

    entity.id = `uuid-${++this.idCounter}`;
    entity.createdAt = entity.createdAt ?? new Date();
    this.store.push(entity);

    return entity;
  }

  async findOne(options: {
    where: Record<string, unknown>;
  }): Promise<SigningKeyEntity | null> {
    const where = options.where;

    return (
      this.store.find((entity) => {
        for (const [key, condition] of Object.entries(where)) {
          const value = (entity as Record<string, unknown>)[key];

          // Handle TypeORM Not(IsNull()) — represented as FindOperator
          if (
            condition &&
            typeof condition === 'object' &&
            '_type' in condition
          ) {
            const op = condition as { _type: string; _value?: unknown };

            if (op._type === 'not') {
              const inner = op._value as {
                _type: string;
              } | null;

              if (inner && inner._type === 'isNull') {
                if (value === null || value === undefined) return false;
                continue;
              }
            }

            if (op._type === 'isNull') {
              if (value !== null && value !== undefined) return false;
              continue;
            }
          }

          if (value !== condition) return false;
        }

        return true;
      }) ?? null
    );
  }

  async find(
    options?: { where?: Record<string, unknown>; order?: unknown },
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
  ): Promise<any[]> {
    if (!options?.where) return [...this.store];

    const results: SigningKeyEntity[] = [];

    for (const entity of this.store) {
      let match = true;

      for (const [key, condition] of Object.entries(options.where)) {
        const value = (entity as Record<string, unknown>)[key];

        if (
          condition &&
          typeof condition === 'object' &&
          '_type' in condition
        ) {
          const op = condition as { _type: string };

          if (op._type === 'isNull') {
            if (value !== null && value !== undefined) {
              match = false;
              break;
            }
            continue;
          }
        }

        if (value !== condition) {
          match = false;
          break;
        }
      }

      if (match) results.push(entity);
    }

    return results;
  }

  reset(): void {
    this.store = [];
    this.idCounter = 0;
  }
}

describe('ES256 Asymmetric JWT Signing Integration', () => {
  let signingKeyService: SigningKeyService;
  let jwtWrapperService: JwtWrapperService;
  let repository: InMemorySigningKeyRepository;

  beforeEach(async () => {
    repository = new InMemorySigningKeyRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SigningKeyService,
        JwtWrapperService,
        {
          provide: getRepositoryToken(SigningKeyEntity),
          useValue: repository,
        },
        {
          provide: TwentyConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'IS_ASYMMETRIC_SIGNING_ENABLED') return true;
              if (key === 'APP_SECRET') return 'test-secret';

              return undefined;
            }),
          },
        },
        {
          provide: EnterprisePlanService,
          useValue: {
            hasValidEnterpriseKey: jest.fn().mockReturnValue(true),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
            decode: jest.fn(),
          },
        },
      ],
    }).compile();

    signingKeyService = module.get<SigningKeyService>(SigningKeyService);
    jwtWrapperService = module.get<JwtWrapperService>(JwtWrapperService);
  });

  it('should complete the full key lifecycle: generate, sign, verify, rotate, retire', async () => {
    // Step 1: Generate an ES256 key pair via onModuleInit
    await signingKeyService.onModuleInit();

    const signingKey = await signingKeyService.getCurrentSigningKey();

    expect(signingKey).not.toBeNull();
    expect(signingKey!.kid).toHaveLength(12);
    expect(signingKey!.publicKey).toContain('-----BEGIN PUBLIC KEY-----');
    expect(signingKey!.privateKey).toContain('-----BEGIN PRIVATE KEY-----');

    const originalKid = signingKey!.kid;

    // Step 2: Sign a JWT with the active private key
    const payload = {
      sub: 'user-123',
      type: 'ACCESS',
      workspaceId: 'ws-456',
    };

    const token = await jwtWrapperService.sign(payload, {
      expiresIn: '1h',
      jwtid: 'test-jti-1',
    });

    expect(token).toBeDefined();

    // Verify the token has the correct header
    const decoded = jwt.decode(token, { complete: true });

    expect(decoded?.header.alg).toBe('ES256');
    expect(decoded?.header.kid).toBe(originalKid);

    // Step 3: Verify the JWT succeeds with kid-based routing
    const verified = await jwtWrapperService.verifyJwtToken(token);

    expect(verified).toBeDefined();
    expect((verified as jwt.JwtPayload).sub).toBe('user-123');

    // Step 4: Rotate the key (new key pair generated, old private key destroyed)
    const newKeyEntity = await signingKeyService.rotateKey();

    expect(newKeyEntity.kid).not.toBe(originalKid);
    expect(newKeyEntity.algorithm).toBe('ES256');

    const newSigningKey = await signingKeyService.getCurrentSigningKey();

    expect(newSigningKey).not.toBeNull();
    expect(newSigningKey!.kid).toBe(newKeyEntity.kid);

    // Step 5: Verify the OLD token still works (public key retained)
    const verifiedOld = await jwtWrapperService.verifyJwtToken(token);

    expect(verifiedOld).toBeDefined();
    expect((verifiedOld as jwt.JwtPayload).sub).toBe('user-123');

    // Step 6: Sign a NEW token with the new active key
    const newPayload = {
      sub: 'user-789',
      type: 'ACCESS',
      workspaceId: 'ws-999',
    };

    const newToken = await jwtWrapperService.sign(newPayload, {
      expiresIn: '1h',
      jwtid: 'test-jti-2',
    });

    const newDecoded = jwt.decode(newToken, { complete: true });

    expect(newDecoded?.header.kid).toBe(newKeyEntity.kid);

    // Step 7: Verify the new token works
    const verifiedNew = await jwtWrapperService.verifyJwtToken(newToken);

    expect(verifiedNew).toBeDefined();
    expect((verifiedNew as jwt.JwtPayload).sub).toBe('user-789');

    // Step 8: Retire the old key
    const retired = await signingKeyService.retireKey(originalKid);

    expect(retired).not.toBeNull();
    expect(retired!.isActive).toBe(false);
    expect(retired!.retiredAt).toBeDefined();

    // Step 9: Verify the old token fails after retirement
    await expect(jwtWrapperService.verifyJwtToken(token)).rejects.toThrow(
      AuthException,
    );

    // The new token should still work
    const stillValid = await jwtWrapperService.verifyJwtToken(newToken);

    expect(stillValid).toBeDefined();
    expect((stillValid as jwt.JwtPayload).sub).toBe('user-789');
  });

  it('should handle multiple rotations correctly', async () => {
    await signingKeyService.onModuleInit();

    // Sign with key 1
    const token1 = await jwtWrapperService.sign(
      { sub: 'user-1', type: 'ACCESS', workspaceId: 'ws-1' },
      { expiresIn: '1h', jwtid: 'jti-rot-1' },
    );

    // Rotate to key 2
    await signingKeyService.rotateKey();

    const token2 = await jwtWrapperService.sign(
      { sub: 'user-2', type: 'ACCESS', workspaceId: 'ws-2' },
      { expiresIn: '1h', jwtid: 'jti-rot-2' },
    );

    // Rotate to key 3
    await signingKeyService.rotateKey();

    const token3 = await jwtWrapperService.sign(
      { sub: 'user-3', type: 'ACCESS', workspaceId: 'ws-3' },
      { expiresIn: '1h', jwtid: 'jti-rot-3' },
    );

    // All three tokens should verify (public keys retained)
    const v1 = await jwtWrapperService.verifyJwtToken(token1);
    const v2 = await jwtWrapperService.verifyJwtToken(token2);
    const v3 = await jwtWrapperService.verifyJwtToken(token3);

    expect((v1 as jwt.JwtPayload).sub).toBe('user-1');
    expect((v2 as jwt.JwtPayload).sub).toBe('user-2');
    expect((v3 as jwt.JwtPayload).sub).toBe('user-3');

    // All three tokens should have different kids
    const kid1 = jwt.decode(token1, { complete: true })?.header.kid;
    const kid2 = jwt.decode(token2, { complete: true })?.header.kid;
    const kid3 = jwt.decode(token3, { complete: true })?.header.kid;

    expect(kid1).not.toBe(kid2);
    expect(kid2).not.toBe(kid3);
    expect(kid1).not.toBe(kid3);
  });
});
