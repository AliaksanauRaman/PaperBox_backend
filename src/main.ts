import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

const DEFAULT_PORT = 3000;

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const portFromEnvironment = configService.get<string>('PORT');
  const finalPort = portFromEnvironment
    ? parseInt(portFromEnvironment)
    : DEFAULT_PORT;

  app.enableCors();

  await app.listen(finalPort);

  logger.log('Server is started.');
  logger.log(`Port: ${finalPort}.`);
}

bootstrap();
