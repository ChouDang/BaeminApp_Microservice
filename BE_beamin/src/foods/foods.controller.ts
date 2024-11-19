import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { AddFoodDto } from './dto/add-food.dto';
import { FoodsService } from './foods.service';

@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}
 
  @ApiTags('Restaurants')
  @ApiOperation({ summary: 'Them food vao restaurant' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('img', {
    storage: diskStorage({
      destination: process.cwd() + '/public/img',
      filename: (req, file, callback) => callback(null, new Date().toISOString() + "_" + file.originalname)
    }),
  }))
  @Post()
  addFoodToRestaurant(
    @Body() addFoodsToRestaurantDto: AddFoodDto,
    @UploadedFile() img: Express.Multer.File
  ) {
    try {
      return this.foodsService.addFoodsToRestaurant(addFoodsToRestaurantDto, img)
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiTags('Foods')
  @Get()
  @ApiOperation({ summary: "Get all foods"})
  getAllFoods(){
    try {
      return this.foodsService.getAllFoods()
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiTags('Foods')
  @Delete()
  @ApiOperation({ summary: "del foods"})
  delFoods(@Query("id") id: string){
    try {
      return this.foodsService.delFoods(id)
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
