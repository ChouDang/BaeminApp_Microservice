import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    JwtModule.register({ secret: process.env.SECRET_KEY_AUTH || "CHOUDANG" }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule { }
