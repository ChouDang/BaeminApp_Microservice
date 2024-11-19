import { ApiProperty } from '@nestjs/swagger';

class OrderItemDto {
  @ApiProperty({ type: String, example: 'food-uuid', description: 'ID của món ăn' })
  foodId: string;

  @ApiProperty({ type: Number, example: 2, description: 'Số lượng món ăn' })
  quantity: number;
}

export class CreatePaymentDto {
  @ApiProperty({ type: String, example: 'user-uuid', description: 'ID của người dùng' })
  userId: string;

  @ApiProperty({ type: [OrderItemDto], description: 'Danh sách các món ăn và số lượng của mỗi món' })
  items: OrderItemDto[];
}
