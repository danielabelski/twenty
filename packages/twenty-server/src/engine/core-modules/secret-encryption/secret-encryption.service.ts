import { Injectable, Logger } from '@nestjs/common';

import { isDefined } from 'twenty-shared/utils';

import {
  decryptText,
  encryptText,
} from 'src/engine/core-modules/auth/auth.util';
import { EnvironmentConfigDriver } from 'src/engine/core-modules/twenty-config/drivers/environment-config.driver';

// AES-256-CTR requires a 16-byte IV prepended to the ciphertext.
// A valid encrypted payload must be at least 17 bytes (16 IV + 1 ciphertext).
const MIN_ENCRYPTED_PAYLOAD_BYTES = 17;

@Injectable()
export class SecretEncryptionService {
  private readonly logger = new Logger(SecretEncryptionService.name);

  constructor(
    private readonly environmentConfigDriver: EnvironmentConfigDriver,
  ) {}

  private getAppSecret(): string {
    return this.environmentConfigDriver.get('APP_SECRET');
  }

  private isValidEncryptedValue(value: string): boolean {
    const buffer = Buffer.from(value, 'base64');

    return buffer.length >= MIN_ENCRYPTED_PAYLOAD_BYTES;
  }

  public encrypt(value: string): string {
    if (!isDefined(value)) {
      return value;
    }

    const appSecret = this.getAppSecret();

    return encryptText(value, appSecret);
  }

  public decrypt(value: string): string {
    if (!isDefined(value)) {
      return value;
    }

    if (!this.isValidEncryptedValue(value)) {
      this.logger.warn(
        'Attempted to decrypt a value that is not a valid encrypted payload — returning raw value',
      );

      return value;
    }

    const appSecret = this.getAppSecret();

    return decryptText(value, appSecret);
  }

  public decryptAndMask({
    value,
    mask,
  }: {
    value: string;
    mask: string;
  }): string {
    if (!isDefined(value)) {
      return value;
    }

    if (!this.isValidEncryptedValue(value)) {
      this.logger.warn(
        'Attempted to decrypt-and-mask a value that is not a valid encrypted payload — returning mask',
      );

      return mask;
    }

    const decryptedValue = this.decrypt(value);

    const visibleCharsCount = Math.min(
      5,
      Math.floor(decryptedValue.length / 10),
    );

    return `${decryptedValue.slice(0, visibleCharsCount)}${mask}`;
  }
}
