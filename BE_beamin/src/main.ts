import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from "express"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors()// origin: *

  const config = new DocumentBuilder().setTitle("Swagger").addBearerAuth().build()
  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup("/swagger",app,document)
  app.use(express.static("."))

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
