import { Controller, Delete, Get, HttpException, HttpStatus, Inject, Post, Query } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CategoriesService } from './categories.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  @MessagePattern("categories_findAllCategories")
  async findAllCategories() {
    try {
      let checkCache = await this.getCache("categories_findAll")
      if (checkCache) {
        return checkCache
      }
      let result = await this.categoriesService.findAllCategories();
      if (result) {
        await this.setCache("categories_findAll", result)
      }
      return result
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @MessagePattern("categories_createCategorie")
  async createCategorie(@Payload() name: string) {
    try {
      let result = this.categoriesService.createCategorie(name);
      if (result) {
        await this.delCache("categories_findAll")
      }
      return result
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @MessagePattern("categories_delCategorie")
  async delCategorie(@Payload("id") id: string) {
    try {
      let result = await this.categoriesService.delCategorie(id);
      if (result) {
        await this.delCache("categories_findAll")
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
