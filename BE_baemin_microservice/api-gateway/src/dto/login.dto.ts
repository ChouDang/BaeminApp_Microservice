import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ type: String, description: 'Email của người dùng' })
    email: string;

    @ApiProperty({ type: String, description: 'Mật khẩu của người dùng' })
    password: string;
}
