import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as express from "express"

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: process.env.PRODUCT_QUEUE,
      queueOptions: {
        durable: true // giữ lại các queue khi rabbitMQ bị restart
      },
      persistent: true // giữ lại các message khi rabbitMQ bị restart
    }
  });

  // Khởi tạo HTTP server để phục vụ file tĩnh
  const apphttp = await NestFactory.create(AppModule);
  apphttp.use(express.static("."))
  await app.listen();
  await apphttp.listen(3001);
}
bootstrap();
