import { NestFactory } from '@nestjs/core';
import { envConfig } from './config/env.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {  ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true
  }));
  const config = new DocumentBuilder()
    .setTitle('E-commerce API')
    .setDescription('The E-commerce API description')
    .setVersion('1.0')
    .addTag('E-commerce')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  console.log(`Environment: ${envConfig().nodeEnv}`);
  console.log(`Server is running on port: ${envConfig().port}`);
  console.log(`swagger is running on port: http://localhost:${envConfig().port}/api`);
  await app.listen(envConfig().port);
}
bootstrap();
