import { Test, type TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import * as jwt from 'jsonwebtoken';

import { EnterprisePlanService } from 'src/engine/core-modules/enterprise/services/enterprise-plan.service';
import { SigningKeyEntity } from 'src/engine/core-modules/signing-key/signing-key.entity';
import { SigningKeyService } from 'src/engine/core-modules/signing-key/signing-key.service';
import { TwentyConfigService } from 'src/engine/core-modules/twenty-config/twenty-config.service';

// oxlint-disable-next-line @typescripttypescript/no-explicit-any
type MockRepository = Record<string, jest.Mock<any>>;

describe('SigningKeyService', () => {
  let service: SigningKeyService;
  let mockSigningKeyRepository: MockRepository;
  let mockTwentyConfigService: Record<string, jest.Mock>;
  let mockEnterprisePlanService: Record<string, jest.Mock>;

  beforeEach(async () => {
    mockSigningKeyRepository = {
      create: jest.fn((data) => ({ ...data })),
      save: jest.fn((entity) => ({ ...entity, id: 'generated-uuid' })),
      findOne: jest.fn(),
      find: jest.fn(),
    };

    mockTwentyConfigService = {
      get: jest.fn((key: string) => {
        if (key === 'IS_ASYMMETRIC_SIGNING_ENABLED') return true;

        return undefined;
      }),
    };

    mockEnterprisePlanService = {
      hasValidEnterpriseKey: jest.fn().mockReturnValue(true),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SigningKeyService,
        {
          provide: getRepositoryToken(SigningKeyEntity),
          useValue: mockSigningKeyRepository,
        },
        {
          provide: TwentyConfigService,
          useValue: mockTwentyConfigService,
        },
        {
          provide: EnterprisePlanService,
          useValue: mockEnterprisePlanService,
        },
      ],
    }).compile();

    service = module.get<SigningKeyService>(SigningKeyService);
  });

  describe('isAsymmetricSigningEnabled', () => {
    it('should return true when config enabled and enterprise key valid', () => {
      expect(service.isAsymmetricSigningEnabled()).toBe(true);
    });

    it('should return false when config disabled', () => {
      mockTwentyConfigService.get.mockReturnValue(false);
      expect(service.isAsymmetricSigningEnabled()).toBe(false);
    });

    it('should return false when enterprise key invalid', () => {
      mockEnterprisePlanService.hasValidEnterpriseKey.mockReturnValue(false);
      expect(service.isAsymmetricSigningEnabled()).toBe(false);
    });
  });

  describe('generateKeyPair and getCurrentSigningKey', () => {
    it('should generate an ES256 key pair and cache it', async () => {
      mockSigningKeyRepository.findOne.mockResolvedValue(null);
      mockSigningKeyRepository.find.mockResolvedValue([]);

      await service.onModuleInit();

      expect(mockSigningKeyRepository.create).toHaveBeenCalled();
      expect(mockSigningKeyRepository.save).toHaveBeenCalled();

      const createCall = mockSigningKeyRepository.create.mock.calls[0][0];

      expect(createCall.algorithm).toBe('ES256');
      expect(createCall.kid).toHaveLength(12);
      expect(createCall.publicKey).toContain('-----BEGIN PUBLIC KEY-----');
      expect(createCall.privateKey).toContain('-----BEGIN PRIVATE KEY-----');
      expect(createCall.isActive).toBe(true);
    });

    it('should not generate a new key if one exists', async () => {
      mockSigningKeyRepository.findOne.mockResolvedValue({
        kid: 'existing-kid',
        publicKey: 'pub',
        privateKey: 'priv',
        isActive: true,
      });
      mockSigningKeyRepository.find.mockResolvedValue([]);

      await service.onModuleInit();

      expect(mockSigningKeyRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('rotateKey', () => {
    it('should null out old private key and generate new key pair', async () => {
      const oldKey = {
        id: 'old-id',
        kid: 'old-kid',
        publicKey: 'old-pub',
        privateKey: 'old-priv',
        isActive: true,
        rotatedAt: null,
      };

      mockSigningKeyRepository.findOne.mockResolvedValue(oldKey);
      mockSigningKeyRepository.save.mockImplementation((entity) => ({
        ...entity,
        id: entity.id ?? 'new-id',
      }));

      const result = await service.rotateKey();

      // First save: nulling old key's private key
      expect(mockSigningKeyRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'old-id',
          privateKey: null,
        }),
      );

      // Second save: new key
      expect(result.kid).not.toBe('old-kid');
      expect(result.algorithm).toBe('ES256');
    });
  });

  describe('retireKey', () => {
    it('should mark key as retired and remove from cache', async () => {
      const key = {
        kid: 'retire-me',
        publicKey: 'pub',
        privateKey: null,
        isActive: true,
        retiredAt: null,
        rotatedAt: new Date(),
      };

      mockSigningKeyRepository.findOne.mockResolvedValue(key);
      mockSigningKeyRepository.save.mockImplementation((entity) => entity);

      const result = await service.retireKey('retire-me');

      expect(result?.isActive).toBe(false);
      expect(result?.retiredAt).toBeDefined();
    });

    it('should return null for unknown kid', async () => {
      mockSigningKeyRepository.findOne.mockResolvedValue(null);

      const result = await service.retireKey('unknown');

      expect(result).toBeNull();
    });
  });

  describe('getPublicKeyByKid', () => {
    it('should return public key from DB on cache miss', async () => {
      mockSigningKeyRepository.findOne.mockResolvedValue({
        kid: 'test-kid',
        publicKey: 'test-pub-key',
        retiredAt: null,
      });

      const result = await service.getPublicKeyByKid('test-kid');

      expect(result).toBe('test-pub-key');
    });

    it('should return null for retired key', async () => {
      mockSigningKeyRepository.findOne.mockResolvedValue(null);

      const result = await service.getPublicKeyByKid('retired-kid');

      expect(result).toBeNull();
    });

    it('should return cached value on second call', async () => {
      mockSigningKeyRepository.findOne.mockResolvedValue({
        kid: 'cached-kid',
        publicKey: 'cached-pub',
        retiredAt: null,
      });

      await service.getPublicKeyByKid('cached-kid');
      const result = await service.getPublicKeyByKid('cached-kid');

      expect(result).toBe('cached-pub');
      expect(mockSigningKeyRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('getPublicKeyAsJwk', () => {
    it('should convert PEM to JWK format', async () => {
      // Generate a real key pair for this test
      const { generateKeyPairSync } = await import('crypto');
      const { publicKey } = generateKeyPairSync('ec', {
        namedCurve: 'P-256',
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
      });

      const jwk = service.getPublicKeyAsJwk(publicKey, 'test-kid');

      expect(jwk.kty).toBe('EC');
      expect(jwk.crv).toBe('P-256');
      expect(jwk.kid).toBe('test-kid');
      expect(jwk.use).toBe('sig');
      expect(jwk.alg).toBe('ES256');
      expect(jwk.x).toBeDefined();
      expect(jwk.y).toBeDefined();
    });
  });

  describe('end-to-end signing and verification', () => {
    it('should sign with ES256 and verify with public key', async () => {
      const { generateKeyPairSync, createHash } = await import('crypto');
      const { publicKey, privateKey } = generateKeyPairSync('ec', {
        namedCurve: 'P-256',
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
      });

      const kid = createHash('sha256')
        .update(publicKey)
        .digest('hex')
        .substring(0, 12);

      const token = jwt.sign({ sub: 'test-user' }, privateKey, {
        algorithm: 'ES256',
        keyid: kid,
      });

      const decoded = jwt.decode(token, { complete: true });

      expect(decoded?.header.kid).toBe(kid);
      expect(decoded?.header.alg).toBe('ES256');

      const verified = jwt.verify(token, publicKey, {
        algorithms: ['ES256'],
      });

      expect((verified as jwt.JwtPayload).sub).toBe('test-user');
    });

    it('should fail verification with wrong public key', async () => {
      const { generateKeyPairSync } = await import('crypto');
      const keyPair1 = generateKeyPairSync('ec', {
        namedCurve: 'P-256',
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
      });
      const keyPair2 = generateKeyPairSync('ec', {
        namedCurve: 'P-256',
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
      });

      const token = jwt.sign({ sub: 'test' }, keyPair1.privateKey, {
        algorithm: 'ES256',
      });

      expect(() =>
        jwt.verify(token, keyPair2.publicKey, { algorithms: ['ES256'] }),
      ).toThrow();
    });
  });
});
