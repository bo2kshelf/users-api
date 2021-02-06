import {Injectable} from '@nestjs/common';
import {Prisma} from '@prisma/client';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class GitHubUsersService {
  constructor(private prismaService: PrismaService) {}

  async getGitHubUser(where: Prisma.UserGitHubWhereUniqueInput) {
    return this.prismaService.userGitHub.findUnique({where});
  }

  async getUser(where: Prisma.UserGitHubWhereUniqueInput) {
    return this.prismaService.userGitHub
      .findUnique({
        where,
        include: {user: true},
      })
      .user();
  }

  async ensureUser(
    where: {githubId: string},
    data: {userName: string; displayName: string; picture: string},
  ) {
    return this.prismaService.userGitHub
      .upsert({
        where,
        create: {
          ...data,
          githubId: where.githubId,
          user: {create: {}},
        },
        update: {},
        select: {user: true},
      })
      .user();
  }

  async createUser(data: Prisma.UserCreateInput) {
    return this.prismaService.user.create({data});
  }
}
