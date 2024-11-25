import { Controller, Delete, Get, HttpException, HttpStatus, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FoodsService } from './foods.service';

@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) { }

  @UseInterceptors(FileInterceptor('img', {
    storage: diskStorage({
      destination: process.cwd() + '/public/img',
      filename: (req, file, callback) => callback(null, new Date().toISOString() + "_" + file.originalname)
    }),
  }))
  @MessagePattern("addFoodToRestaurant")
  addFoodToRestaurant(
    @Payload() addFoodsToRestaurantDto,
    @UploadedFile() img: Express.Multer.File
  ) {
    try {
      return this.foodsService.addFoodsToRestaurant(addFoodsToRestaurantDto, img)
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @MessagePattern("foods_get")
  getAllFoods() {
    try {
      return this.foodsService.getAllFoods()
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @MessagePattern("foods_del")
  delFoods(@Payload("id") id: string) {
    try {
      return this.foodsService.delFoods(id)
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
