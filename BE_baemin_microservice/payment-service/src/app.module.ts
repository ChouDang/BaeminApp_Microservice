import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './payment/payment.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtStrategy } from './stratery/jwt.stragery';

@Module({
  imports: [PrismaModule],
  controllers: [AppController, PaymentModule],
  providers: [AppService,JwtStrategy],
})
export class AppModule {}
