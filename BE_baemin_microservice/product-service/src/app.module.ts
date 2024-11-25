import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { CategoriesModule } from './categories/categories.module';
import { FoodsModule } from './foods/foods.module';

@Module({
  imports: [PrismaModule],
  controllers: [AppController, RestaurantsModule, CategoriesModule, FoodsModule],
  providers: [AppService],
})
export class AppModule { }
