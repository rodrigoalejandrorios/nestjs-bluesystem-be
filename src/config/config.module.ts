import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ConfigService } from './config.service';

const providers = [ConfigService];

@Global()
@Module({
  providers,
  imports: [HttpModule],
  exports: [...providers, HttpModule],
})
export class ConfigModule {}
