import {Injectable} from '@nestjs/common';
import {Prisma} from '@prisma/client';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class AccountsService {
  constructor(private prismaService: PrismaService) {}

  getProfile(where: Prisma.ProfileWhereUniqueInput) {
    return this.prismaService.profile.findUnique({where});
  }

  getAllProfiles() {
    return this.prismaService.profile.findMany();
  }

  createProfile({
    userId,
    ...data
  }: {
    userName: string;
    displayName: string;
    picture: string;
    userId: string;
  }) {
    return this.prismaService.profile.create({
      data: {
        ...data,
        user: {connect: {id: userId}},
      },
    });
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
    return this.prismaService.profile
      .findUnique({
        where,
        select: {records: true},
      })
      .records(args);
  }
}
