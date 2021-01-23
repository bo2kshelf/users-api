import {Injectable} from '@nestjs/common';
import {Prisma, Profile} from '@prisma/client';
import {PrismaService} from '../prisma/prisma.service';
import {CurrentUserPayload} from './current-user.decorator';
@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async isCurrentUserMe(
    currentUser: CurrentUserPayload,
    userName: string,
  ): Promise<boolean> {
    return this.prismaService.user
      .findUnique({where: {sub: currentUser.sub}, select: {profile: true}})
      .then((user) => user?.profile.userName === userName);
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

  async getUser(sub: string) {
    return this.prismaService.user.findUnique({
      where: {sub},
      include: {profile: true},
    });
  }

  async getProfile(
    where: Prisma.ProfileWhereUniqueInput,
  ): Promise<Profile | null> {
    return this.prismaService.profile.findUnique({
      where,
    });
  }

  async updateProfile(
    where: Prisma.ProfileWhereUniqueInput,
    data: Prisma.ProfileUpdateInput,
  ): Promise<Profile> {
    return this.prismaService.profile.update({where, data});
  }

  async ensureUser(sub: string, data: {picture: string; displayName: string}) {
    return this.prismaService.user
      .create({
        select: {profile: true},
        data: {
          sub,
          profile: {
            create: {userName: sub, ...data},
          },
        },
      })
      .profile();
  }
}
