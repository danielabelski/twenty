import { Logger } from '@nestjs/common';

import { SentryCronMonitor } from 'src/engine/core-modules/cron/sentry-cron-monitor.decorator';
import { Process } from 'src/engine/core-modules/message-queue/decorators/process.decorator';
import { Processor } from 'src/engine/core-modules/message-queue/decorators/processor.decorator';
import { MessageQueue } from 'src/engine/core-modules/message-queue/message-queue.constants';
import { SIGNING_KEY_ROTATION_CRON_PATTERN } from 'src/engine/core-modules/signing-key/crons/constants/signing-key-rotation-cron-pattern.constant';
import { SigningKeyService } from 'src/engine/core-modules/signing-key/signing-key.service';

@Processor(MessageQueue.cronQueue)
export class SigningKeyRotationCronJob {
  private readonly logger = new Logger(SigningKeyRotationCronJob.name);

  constructor(private readonly signingKeyService: SigningKeyService) {}

  @Process(SigningKeyRotationCronJob.name)
  @SentryCronMonitor(
    SigningKeyRotationCronJob.name,
    SIGNING_KEY_ROTATION_CRON_PATTERN,
  )
  async handle(): Promise<void> {
    if (!this.signingKeyService.isAsymmetricSigningEnabled()) {
      return;
    }

    this.logger.log('Starting signing key rotation');

    await this.signingKeyService.rotateKey();

    this.logger.log('Signing key rotation completed');
  }
}
