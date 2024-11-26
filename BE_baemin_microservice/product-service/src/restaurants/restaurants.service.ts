import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RestaurantsService {

  constructor(private prisma: PrismaService) { }

  async create(createRestaurantDto) {
    try {
      return this.prisma.restaurants.create({
        data: createRestaurantDto
      })
    } catch (error) {
      console.log(error, "error")
    }
  }

  async findAll() {
    return this.prisma.restaurants.findMany().catch(err => err)
  }

  async findOne(id: string) {
    try {
      return await this.prisma.restaurants.findUnique({
        where: { id },
        include: {
          foods: {
            include: {
              categories: true
            }
          },
        },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }


  async getRestaurantsOfCategories(categorie: string, page: number, size: number, query: string) {

    const restaurants = await this.prisma.restaurants.findMany({
      skip: (page - 1) * size,
      take: size,
      where: {
        AND: [
          {
            foods: {
              some: {
                category_id: categorie
              }
            }
          },
          {
            OR: [
              { name: { contains: query, mode: "insensitive" } },
              { foods: { some: { name: { contains: query, mode: "insensitive" } } } }
            ]
          }
        ]
      },
      include: {
        foods: true
      }
    });

    const totalCountAll = await this.prisma.restaurants.count();

    const totalCount = await this.prisma.restaurants.count({
      where: {
        AND: [
          {
            foods: {
              some: {
                category_id: categorie
              }
            }
          },
          {
            OR: [
              { name: { contains: query, mode: "insensitive" } },
              { foods: { some: { name: { contains: query, mode: "insensitive" } } } }
            ]
          }
        ]
      },
    });

    return {
      totalCount,
      totalPages: Math.ceil(totalCountAll / size),
      currentPage: page,
      size,
      data: restaurants,
    };
  }

  async delRestaurants(id: string) {
    try {
      return this.prisma.restaurants.delete({
        where: { id }
      })
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }
}
