import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';

import { JwtWrapperService } from 'src/engine/core-modules/jwt/services/jwt-wrapper.service';
import { SigningKeyModule } from 'src/engine/core-modules/signing-key/signing-key.module';
import { TwentyConfigModule } from 'src/engine/core-modules/twenty-config/twenty-config.module';
import { TwentyConfigService } from 'src/engine/core-modules/twenty-config/twenty-config.service';

const InternalJwtModule = NestJwtModule.registerAsync({
  useFactory: async (twentyConfigService: TwentyConfigService) => {
    return {
      secret: twentyConfigService.get('APP_SECRET'),
      signOptions: {
        algorithm: 'HS256',
        expiresIn: twentyConfigService.get('ACCESS_TOKEN_EXPIRES_IN'),
      },
      verifyOptions: {
        algorithms: ['HS256', 'ES256'],
      },
    };
  },
  inject: [TwentyConfigService],
});

@Module({
  imports: [InternalJwtModule, TwentyConfigModule, SigningKeyModule],
  controllers: [],
  providers: [JwtWrapperService],
  exports: [JwtWrapperService, SigningKeyModule],
})
export class JwtModule {}
