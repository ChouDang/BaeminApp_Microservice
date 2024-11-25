import { Controller, Delete, Get, HttpException, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) { }

  @Post()
  @UseInterceptors(FileInterceptor('img', {
    storage: diskStorage({
      destination: process.cwd() + '/public/img',
      filename: (req, file, callback) => callback(null, new Date() + "_" + file.originalname)
    }),
  }))
  @MessagePattern("restaurants_create")
  async create(
    @Payload() createRestaurantDto,
    @UploadedFile() img: Express.Multer.File
  ) {
    try {
      return this.restaurantsService.create({
        ...createRestaurantDto,
        img: img ? img.path : null,
      });
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @MessagePattern("restaurants_findAll")
  findAll() {
    try {
      return this.restaurantsService.findAll();
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @MessagePattern("restaurants_findOne")
  findOne(@Payload() id: string) {
    try {
      return this.restaurantsService.findOne(id);
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/categories/foods")
  @MessagePattern("categories_foods")
  getRestaurantsOfCategories(
    @Payload() body
  ) {
    try {
      const { categorie, page, size, query } = body || {}
      return this.restaurantsService.getRestaurantsOfCategories(categorie, +page, +size, query)
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete("/categories/foods")
  @MessagePattern("delRestaurants")
  delRestaurants(
    @Payload() id: string
  ) {
    try {
      return this.restaurantsService.delRestaurants(id)
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
