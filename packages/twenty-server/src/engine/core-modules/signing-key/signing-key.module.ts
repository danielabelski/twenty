import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnterpriseModule } from 'src/engine/core-modules/enterprise/enterprise.module';
import { SigningKeyDiscoveryController } from 'src/engine/core-modules/signing-key/signing-key.controller';
import { SigningKeyEntity } from 'src/engine/core-modules/signing-key/signing-key.entity';
import { SigningKeyResolver } from 'src/engine/core-modules/signing-key/signing-key.resolver';
import { SigningKeyService } from 'src/engine/core-modules/signing-key/signing-key.service';
import { SigningKeyRotationCronCommand } from 'src/engine/core-modules/signing-key/crons/commands/signing-key-rotation.cron.command';
import { SigningKeyRotationCronJob } from 'src/engine/core-modules/signing-key/crons/signing-key-rotation.cron.job';
import { TwentyConfigModule } from 'src/engine/core-modules/twenty-config/twenty-config.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SigningKeyEntity]),
    TwentyConfigModule,
    EnterpriseModule,
  ],
  providers: [
    SigningKeyService,
    SigningKeyResolver,
    SigningKeyRotationCronJob,
    SigningKeyRotationCronCommand,
  ],
  controllers: [SigningKeyDiscoveryController],
  exports: [SigningKeyService],
})
export class SigningKeyModule {}
