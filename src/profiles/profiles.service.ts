import {Injectable} from '@nestjs/common';
import {Prisma} from '@prisma/client';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class ProfilesService {
  constructor(private prismaService: PrismaService) {}

  getProfile(where: Prisma.ProfileWhereUniqueInput) {
    return this.prismaService.profile.findUnique({where});
  }

  createProfile(data: Prisma.ProfileCreateInput) {
    return this.prismaService.profile.create({data});
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
