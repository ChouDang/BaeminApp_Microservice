import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './payment/payment.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot({ isGlobal: true }),
    PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
