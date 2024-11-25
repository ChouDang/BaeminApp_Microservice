import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: process.env.NOTIFICATION_QUEUE,
      queueOptions: {
        durable: false // giữ lại các queue khi rabbitMQ bị restart
      },
      persistent: false // giữ lại các message khi rabbitMQ bị restart
    }
  });
  await app.listen();
}
bootstrap();
