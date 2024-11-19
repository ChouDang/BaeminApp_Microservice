import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CategoriesService {

  prisma = new PrismaClient()

  async createCategorie(name: string) {
    try {
      return await this.prisma.categories.create({
        data: { name }
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  async findAllCategories() {
    try {
      return this.prisma.categories.findMany()
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  async delCategorie (id: string) {
    try {
      return this.prisma.categories.delete({
        where: { id }
      })
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }
}
