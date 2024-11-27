import { Controller, Delete, Get, HttpException, HttpStatus, Inject, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { RestaurantsService } from './restaurants.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('restaurants')
export class RestaurantsController {
  constructor(
    private readonly restaurantsService: RestaurantsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

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
      let result = this.restaurantsService.create({
        ...createRestaurantDto,
        img: img ? img.path : null,
      });
      if (result) {
        await this.delCache("restaurants_findAll")
      }
      return result
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @MessagePattern("restaurants_findAll")
  async findAll() {
    try {
      let checkCache = await this.getCache("restaurants_findAll")
      if (checkCache) {
        return checkCache
      }
      let result = await this.restaurantsService.findAll();
      if (result) {
        await this.setCache("restaurants_findAll", result)
      }
      return result
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @MessagePattern("restaurants_findOne")
  findOne(@Payload() id: string) {
    try {
      return this.restaurantsService.findOne(id);
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @MessagePattern("categories_foods")
  async getRestaurantsOfCategories(
    @Payload() body
  ) {
    try {
      const { categorie, page, size, query } = body || {}
      let result = this.restaurantsService.getRestaurantsOfCategories(categorie, +page, +size, query)
      return result
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @MessagePattern("delRestaurants")
  async delRestaurants(
    @Payload() id: string
  ) {
    try {
      let result = await this.restaurantsService.delRestaurants(id)
      if (result) {
        await this.delCache("restaurants_findAll")
      }
      return result
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async setCache(key: string, value: any, ttl: number = 10000) {
    await this.cacheManager.set(key, value, ttl);
  }
  async getCache(key: string): Promise<any> {
    return await this.cacheManager.get(key);
  }
  async delCache(key: string) {
    await this.cacheManager.del(key);
  }
  async resetCache() {
    await this.cacheManager.reset();
  }
}
