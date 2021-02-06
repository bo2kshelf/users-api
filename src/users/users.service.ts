import {Injectable} from '@nestjs/common';
import {Prisma} from '@prisma/client';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async getUser(where: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUnique({where});
  }

  async createUser(data: Prisma.UserCreateInput) {
    return this.prismaService.user.create({data});
  }

  async getGitHubUser(where: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user
      .findUnique({
        where,
        select: {userGitHub: true},
      })
      .userGitHub();
  }

  async getAccount(where: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user
      .findUnique({where, select: {account: true}})
      .account();
  }
}
