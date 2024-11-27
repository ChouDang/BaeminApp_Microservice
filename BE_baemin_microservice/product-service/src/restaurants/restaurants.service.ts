import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RestaurantsService {

  constructor(
    private prisma: PrismaService,
    private elasticService: ElasticsearchService
  ) { }

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
    try {
      // Tìm kiếm các món ăn từ foods_index
      // Truy vấn kết hợp cả nhà hàng và món ăn
      const response = await this.elasticService.search({
        index: ['restaurants_index', 'foods_index'],
        body: {
          from: (page - 1) * size,
          size: size,
          query: {
            bool: {
              should: [
                {
                  match: {
                    _index: "restaurants_index",
                    name: {
                      query: query,
                      operator: "and",
                      fuzziness: "AUTO"
                    }
                  }
                },
                {
                  match: {
                    _index: "foods_index",
                    name: {
                      query: query,
                      operator: "and",
                      fuzziness: "AUTO"
                    }
                  }
                }
              ],
              filter: [
                {
                  term: {
                    category_id: categorie
                  }
                }
              ]
            }
          }
        }
      });

      // Lấy các kết quả từ cả hai chỉ mục
      const hits = response.hits.hits;
      const restaurants = [];
      const foods = [];

      // Phân loại các kết quả từ restaurants_index và foods_index
      hits.forEach(hit => {
        if (hit._index === 'restaurants_index') {
          restaurants.push(hit._source);
        } else if (hit._index === 'foods_index') {
          foods.push(hit._source);
        }
      });

      // Ghép các món ăn vào nhà hàng
      const result = restaurants.map(restaurant => {
        const restaurantFoods = foods.filter(food => food.restaurant_id === restaurant.id);
        restaurant.foods = restaurantFoods;  // Gắn món ăn vào trường foods của nhà hàng
        return restaurant;
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
        data: result,
      };

    } catch (error) {
      console.log(error, "error")
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
