import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ type: String, description: 'Tên' })
  firstname: string;

  @ApiProperty({ type: String, description: 'Họ' })
  lastname: string;

  @ApiProperty({ type: String, description: 'Tên người dùng' })
  username: string;

  @ApiProperty({ type: String, description: 'Số điện thoại' })
  phonenumber: string;

  @ApiProperty({ type: String, description: 'Email' })
  email: string;

  @ApiProperty({ type: String, description: 'Mật khẩu' })
  password: string;
}
