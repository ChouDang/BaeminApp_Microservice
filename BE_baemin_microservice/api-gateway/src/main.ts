import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston'

async function bootstrap() {

  const logger = WinstonModule.createLogger({
    defaultMeta: { service: "API Gateway" },
    transports: [
      new winston.transports.Http({
        host: "logstash",
        port: 5044,
        level: 'error'
      })
    ],
  });
  const app = await NestFactory.create(AppModule, { logger });
  app.enableCors()// origin: *
  const config = new DocumentBuilder().setTitle("Swagger").addBearerAuth().build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("/swagger", app, document)
  await app.listen(8080, () => { });
}
bootstrap();
