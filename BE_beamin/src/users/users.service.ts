import { Injectable } from '@nestjs/common';
import { PrismaClient, users } from '@prisma/client';

@Injectable()
export class UsersService {
  prisma = new PrismaClient();

  async create(createUserDto: Omit<users, 'id'>) {
    return this.prisma.users.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return this.prisma.users.findMany();
  }

  async findByEmail(email: string) {
    return await this.prisma.users.findUnique({
      where: { email },
    });
  }

  async update(id: string, updateUserDto: Omit<users, 'id'>) {
    return this.prisma.users.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return this.prisma.users.delete({
      where: { id },
    });
  }
}
