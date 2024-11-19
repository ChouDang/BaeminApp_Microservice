import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PaymentModule } from './payment/payment.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { JwtStrategy } from './stratery/jwt.stragery';
import { CategoriesModule } from './categories/categories.module';
import { FoodsModule } from './foods/foods.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    PaymentModule, RestaurantsModule, AuthModule, CategoriesModule, FoodsModule, UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule { }
