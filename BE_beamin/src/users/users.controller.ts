import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags("User")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @ApiOperation({ summary: 'get all user' })
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'sua user' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'del user' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
