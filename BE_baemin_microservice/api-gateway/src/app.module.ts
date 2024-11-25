import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './stratery/jwt.stragery';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ClientsModule.register([
      {
        name: process.env.IDENTITY_NAME,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: process.env.IDENTITY_QUEUE,
          queueOptions: {
            durable: true
          },
          persistent: true
        }
      },
      {
        name: process.env.NOTIFICATION_NAME,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: process.env.NOTIFICATION_QUEUE,
          queueOptions: {
            durable: false
          },
          persistent: false
        }
      },
      {
        name: process.env.PAYMENT_NAME,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: process.env.PAYMENT_QUEUE,
          queueOptions: {
            durable: true
          },
          persistent: true
        }
      },     
      {
        name: process.env.PRODUCT_NAME,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: process.env.PRODUCT_QUEUE,
          queueOptions: {
            durable: true
          },
          persistent: true
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule { }
