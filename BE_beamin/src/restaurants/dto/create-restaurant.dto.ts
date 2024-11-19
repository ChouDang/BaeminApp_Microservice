import { ApiProperty } from '@nestjs/swagger';

export class CreateRestaurantDto {
  @ApiProperty({ type: String, description: 'Tên của nhà hàng' })
  name: string;

  @ApiProperty({ type: String, description: 'Địa chỉ của nhà hàng' })
  address: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Hình ảnh của nhà hàng',
    required: false
  })
  img?: string;
}
