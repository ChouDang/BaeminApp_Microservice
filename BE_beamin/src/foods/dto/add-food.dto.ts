import { ApiProperty } from '@nestjs/swagger';

export class AddFoodDto {
  @ApiProperty({ type: String, description: 'Tên món ăn' })
  name: string;

  @ApiProperty({ type: String, description: 'Mô tả về món ăn' })
  description: string;

  @ApiProperty({ type: Number, description: 'Giá của món ăn' })
  price: number;

  @ApiProperty({ type: Number, description: 'Số lượng trong kho' })
  stock: number;

  @ApiProperty({ type: String, description: 'ID của nhà hàng' })
  restaurant_id: string;

  @ApiProperty({ type: String, description: 'ID của danh mục món ăn' })
  category_id: string;

  @ApiProperty({ type: 'string', format: 'binary', description: 'Ảnh món ăn' })
  img: any;
}
