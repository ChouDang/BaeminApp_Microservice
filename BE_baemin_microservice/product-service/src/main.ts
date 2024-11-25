import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as express from "express"
import { join } from 'path';

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
  apphttp.use('/public', express.static(join(__dirname, '..', 'uploads'))); // Chỉ định thư mục chứa file tĩnh
  // Lắng nghe cả RabbitMQ và HTTP server
  await app.listen();
  await apphttp.listen(3001);
}
bootstrap();
