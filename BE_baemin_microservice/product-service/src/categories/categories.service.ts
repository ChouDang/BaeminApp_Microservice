import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {

  constructor(private prisma: PrismaService) { }

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

  async delCategorie(id: string) {
    try {
      return this.prisma.categories.delete({
        where: { id }
      })
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }
}
