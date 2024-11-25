import { Controller, Delete, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @MessagePattern("categories_findAllCategories")
  findAllCategories() {
    try {
      return this.categoriesService.findAllCategories();
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @MessagePattern("categories_createCategorie")
  createCategorie(@Payload() name: string) {
    try {
      return this.categoriesService.createCategorie(name);
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @MessagePattern("categories_delCategorie")
  delCategorie(@Payload("id") id: string) {
    try {
      return this.categoriesService.delCategorie(id);
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
