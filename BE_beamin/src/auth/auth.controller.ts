import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';

@ApiTags("User")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("sign-up")
  @ApiOperation({ summary: 'dang ky' })
  signUp(
    @Body() body: SignUpDto,
  ) {
    try {
      return this.authService.signUp(body)
    } catch (error) {
      throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post("login")
  @ApiOperation({ summary: 'dang nhap' })
  login(
    @Body() body: LoginDto,
  ) {
    try {
      return this.authService.login(body);
    } catch (error) {
      throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

}
