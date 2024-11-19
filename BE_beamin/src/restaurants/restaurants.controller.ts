import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { restaurants } from '@prisma/client';
import { diskStorage } from 'multer';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) { }

  @ApiTags('Restaurants')
  @ApiOperation({ summary: 'Tao cua hang' })
  @ApiResponse({ status: 400, description: 'Yêu cầu không hợp lệ.' })
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('img', {
    storage: diskStorage({
      destination: process.cwd() + '/public/img',
      filename: (req, file, callback) => callback(null, new Date() + "_" + file.originalname)
    }),
  }))
  async create(
    @Body() createRestaurantDto: CreateRestaurantDto,
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

  @ApiTags('Restaurants')
  @ApiOperation({ summary: 'Lay ds cua hang' })
  @Get()
  findAll() {
    try {
      return this.restaurantsService.findAll();
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiTags('Restaurants')
  @ApiOperation({ summary: 'Chi tiet cua hang' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.restaurantsService.findOne(id);
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiTags('Restaurants')
  @ApiOperation({ summary: 'Lay ds cua hang (phan trang) theo danh muc' })
  @Get("/categories/foods")
  getRestaurantsOfCategories(
    @Query("categorie") categorie: string,
    @Query("page") page: string = "1",
    @Query("size") size: string = "10",
    @Query("query") query: string
  ) {
    try {
      return this.restaurantsService.getRestaurantsOfCategories(categorie, +page, +size, query)
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiTags('Restaurants')
  @ApiOperation({ summary: 'del Restaurants' })
  @Delete("/categories/foods")
  delRestaurants(
    @Query("id") id: string
  ) {
    try {
      return this.restaurantsService.delRestaurants(id)
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
