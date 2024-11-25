import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { foods } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentService {

  constructor(private prisma: PrismaService) { }

  async createOrders(createPaymentDto: {
    userId: string;
    items: {
      foodId: string;
      quantity: number;
    }[];
  }) {
    const { userId, items } = createPaymentDto;
    return this.prisma.$transaction(async (prisma) => {
      // Kiểm tra và cập nhật stock của từng món ăn
      let foods: foods[] = []
      for (const item of items) {
        const food = await prisma.foods.findUnique({
          where: { id: item.foodId },
        });
        if (!food) {
          throw new NotFoundException(`Food item with ID ${item.foodId} not found`);
        }

        if (food.stock < item.quantity) {
          throw new BadRequestException(
            `Not enough stock for food item ${food.name}. Available stock: ${food.stock}, requested: ${item.quantity}`,
          );
        }

        // Cập nhật stock của món ăn
        await prisma.foods.update({
          where: { id: item.foodId },
          data: {
            stock: food.stock - item.quantity,
          },
        });
        foods.push(food)
      }

      // Tính tổng giá trị đơn hàng
      const totalPrice = items.reduce((total, item) => {
        const find_food = foods.find((foodItem) => foodItem.id === item.foodId);
        return total + (find_food ? +find_food.price : 0) * item.quantity;
      }, 0);

      // Tạo đơn hàng
      const order = await prisma.orders.create({
        data: {
          user_id: userId,
          total_price: totalPrice,
          order_food: {
            create: items.map((item) => ({
              food_id: item.foodId,
              quantity: item.quantity,
            })),
          },
        },
        include: {
          order_food: true,
        },
      });

      return {
        message: 'Order and delivery created successfully',
        order: order,
        // delivery,
      };
    });
  }

  getAllOrder() {
    return this.prisma.orders.findMany()
  }

  getOrderDetail(id: string) {
    return this.prisma.orders.findUnique({
      where: { id },
      include: {
        order_food: {
          include: {
            foods: true
          }
        },
        users: true
      }
    })
  }

  delOrder(id: string) {
    return this.prisma.orders.delete({
      where: { id }
    })
  }
}
