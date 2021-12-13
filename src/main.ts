import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';
import { AppModule } from './app.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api');

  app.use(morgan('dev'));

  const configService = app.select(ConfigModule).get(ConfigService);

  const port = configService.getNumber('PORT');
  await app.listen(port);

  console.info(`Server running on port ${port}`);
}
bootstrap();
