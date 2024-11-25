import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()// origin: *
  const config = new DocumentBuilder().setTitle("Swagger").addBearerAuth().build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("/swagger", app, document)
  await app.listen(8080);
}
bootstrap();

// yarn add 
// @nestjs/microservices amqplib amqp-connection-manager 
// nodemailer 
// @nestjs/cache-manager cache-manager@5.7.6 redis cache-manager-redis-store@2.0.0
// Password for the [elastic] user successfully reset.
// New value: JZ9n2yb*zN54q6Ta=Ho=