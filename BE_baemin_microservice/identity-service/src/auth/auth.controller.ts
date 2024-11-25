import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("sign-up")
  @MessagePattern("sign_up")
  signUp(
    @Payload() body,
  ) {
    try {
      return this.authService.signUp(body)
    } catch (error) {
      throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post("login")
  @MessagePattern("login")
  login(
    @Payload() body,
  ) {
    try {
      return this.authService.login(body);
    } catch (error) {
      throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

}
