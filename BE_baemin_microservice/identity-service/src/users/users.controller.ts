import { Controller, Delete, Get, Patch } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @MessagePattern("users_findAll")
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern("users_update")
  update(@Payload() body) {
    const { id, updateUserDto } = body
    return this.usersService.update(id, updateUserDto);
  }

  @MessagePattern("users_del")
  remove(@Payload() id: string) {
    return this.usersService.remove(id);
  }
}
