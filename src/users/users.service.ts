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

  async getProfile(where: Prisma.ProfileWhereUniqueInput) {
    return this.prismaService.user
      .findUnique({where, select: {profile: true}})
      .profile();
  }

  async getRecords(
    where: Prisma.ProfileWhereUniqueInput,
    args: {
      cursor?: Prisma.FindManyRecordArgs['cursor'];
      skip?: number;
      take?: number;
      orderBy?: Pick<Prisma.RecordOrderByInput, 'createdAt' | 'updatedAt'>;
      where?: Prisma.RecordWhereInput;
    },
  ) {
    return this.prismaService.profile.findUnique({where}).records({...args});
  }

  async getRecordsCount(where: Prisma.ProfileWhereUniqueInput) {
    return this.prismaService.record.count({where: {profile: where}});
  }
}
