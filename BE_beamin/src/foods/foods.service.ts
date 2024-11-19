import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AddFoodDto } from './dto/add-food.dto';

@Injectable()
export class FoodsService {
  prisma = new PrismaClient()

  async addFoodsToRestaurant(food: AddFoodDto, img: Express.Multer.File) {
    try {
      return this.prisma.foods.create({
        data: {
          ...food,
          stock: +food.stock,
          price: +food.price,
          img: img ? img.path : null,
        },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllFoods() {
    try {
      return this.prisma.foods.findMany();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getFoodsById(id : string) {
    try {
      return this.prisma.foods.findMany({
        where:{ id }
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async delFoods(id: string) {
    try {
      return this.prisma.foods.delete({
        where: { id }
      })
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
