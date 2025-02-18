import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, LoggerService } from '@nestjs/common';
import 'dotenv/config';
import { TskvLogger } from './logger/tskv.logger';
import { JsonLogger } from './logger/json.logger';
import { DevLogger } from './logger/dev.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logFormat = process.env.LOG_FORMAT;

  let logger: LoggerService;

  if (logFormat === 'tskv') {
    logger = new TskvLogger();
  } else if (process.env.NODE_ENV === 'production') {
    logger = new JsonLogger();
  } else {
    logger = new DevLogger();
  }
  app.useLogger(logger);

  app.setGlobalPrefix('api/afisha');
  app.enableCors();

  await app.listen(3000);
}

bootstrap();
