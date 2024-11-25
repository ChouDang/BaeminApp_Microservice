import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './stratery/jwt.stragery';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ClientsModule.registerAsync([
      {
        name: process.env.IDENTITY_NAME,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get('RABBITMQ_URL') as string],
            queue: configService.get('IDENTITY_QUEUE'),
            queueOptions: {
              durable: true,
            },
            persistent: true,
          },
        }),
        inject: [ConfigService],
      },
      {
        name: process.env.NOTIFICATION_NAME,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get('RABBITMQ_URL') as string],
            queue: configService.get('NOTIFICATION_QUEUE'),
            queueOptions: {
              durable: true,
            },
            persistent: true,
          },
        }),
        inject: [ConfigService],
      },
      {
        name: process.env.PAYMENT_NAME,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get('RABBITMQ_URL') as string],
            queue: configService.get('PAYMENT_QUEUE'),
            queueOptions: {
              durable: true,
            },
            persistent: true,
          },
        }),
        inject: [ConfigService],
      },
      {
        name: process.env.PRODUCT_NAME,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get('RABBITMQ_URL') as string],
            queue: configService.get('PRODUCT_QUEUE'),
            queueOptions: {
              durable: true,
            },
            persistent: true,
          },
        }),
        inject: [ConfigService],
      },
    ])

  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule { }
