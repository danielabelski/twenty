import { Command, CommandRunner } from 'nest-commander';

import { InjectMessageQueue } from 'src/engine/core-modules/message-queue/decorators/message-queue.decorator';
import { MessageQueue } from 'src/engine/core-modules/message-queue/message-queue.constants';
import { MessageQueueService } from 'src/engine/core-modules/message-queue/services/message-queue.service';
import { SigningKeyRotationCronJob } from 'src/engine/core-modules/signing-key/crons/signing-key-rotation.cron.job';
import { TwentyConfigService } from 'src/engine/core-modules/twenty-config/twenty-config.service';

@Command({
  name: 'cron:signing-key:rotate',
  description:
    'Starts a cron job to rotate JWT signing keys on a configurable schedule',
})
export class SigningKeyRotationCronCommand extends CommandRunner {
  constructor(
    @InjectMessageQueue(MessageQueue.cronQueue)
    private readonly messageQueueService: MessageQueueService,
    private readonly twentyConfigService: TwentyConfigService,
  ) {
    super();
  }

  async run(): Promise<void> {
    const cronPattern = this.twentyConfigService.get(
      'SIGNING_KEY_ROTATION_CRON_PATTERN',
    );

    await this.messageQueueService.addCron<undefined>({
      jobName: SigningKeyRotationCronJob.name,
      data: undefined,
      options: {
        repeat: { pattern: cronPattern },
      },
    });
  }
}
