import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { CategoriesModule } from './categories/categories.module';
import { FoodsModule } from './foods/foods.module';
import { RedisCacheModule } from './redis-cache/redis-cache.module';
import { ConfigModule } from '@nestjs/config';
import { ElasticModule } from './elastic/elastic.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register({
      dest: './uploads',
    }),
    RedisCacheModule,
    ElasticModule,
    RestaurantsModule, CategoriesModule, FoodsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
