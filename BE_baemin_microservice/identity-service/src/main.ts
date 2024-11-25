import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: process.env.IDENTITY_QUEUE,
      queueOptions: {
        durable: true // giữ lại các queue khi rabbitMQ bị restart
      },
      persistent: true // giữ lại các message khi rabbitMQ bị restart
    }
  });
  await app.listen();
}
bootstrap();
