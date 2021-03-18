import {Injectable} from '@nestjs/common';
import {Prisma} from '@prisma/client';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findUser(where: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUnique({where});
  }

  async allUsers() {
    return this.prismaService.user.findMany();
  }

  async createUser(data: Prisma.UserCreateInput) {
    return this.prismaService.user.create({data});
  }
}
