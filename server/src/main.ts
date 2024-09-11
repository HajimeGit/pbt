import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import cors from '@util/cors';
import setUpOpenApi from '@util/openapi';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(cors);
  app.setGlobalPrefix('/v1');

  setUpOpenApi(app);

  await app.listen(configService.getOrThrow('app.port'));
}
bootstrap();
