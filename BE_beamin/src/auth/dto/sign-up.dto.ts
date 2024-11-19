import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({ type: String, description: 'Tên đầu tiên của người dùng' })
  firstname: string;

  @ApiProperty({ type: String, description: 'Tên họ của người dùng' })
  lastname: string;

  @ApiProperty({ type: String, description: 'Tên đăng nhập của người dùng' })
  username: string;

  @ApiProperty({ type: String, description: 'Số điện thoại của người dùng' })
  phonenumber: string;

  @ApiProperty({ type: String, description: 'Email của người dùng' })
  email: string;

  @ApiProperty({ type: String, description: 'Mật khẩu của người dùng' })
  password: string;
}
