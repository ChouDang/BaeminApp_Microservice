import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  
  @ApiTags('categories')
  @ApiOperation({ summary: 'Lay ds danh muc' })
  @Get()
  findAllCategories() {
    try {
      return this.categoriesService.findAllCategories();
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiTags('categories')
  @ApiOperation({ summary: 'them danh muc' })
  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
      },
    },
  })
  createCategorie(@Body() body: { name: string }) {
    try {
      return this.categoriesService.createCategorie(body.name);
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiTags('categories')
  @ApiOperation({ summary: 'del danh muc' })
  @Delete()
  delCategorie(@Query("id") id: string) {
    try {
      return this.categoriesService.delCategorie(id);
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
