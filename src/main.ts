import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log(process.env.PORT)
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
