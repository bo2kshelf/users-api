import {Injectable} from '@nestjs/common';
import {Prisma} from '@prisma/client';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class RecordsService {
  constructor(private prismaService: PrismaService) {}

  async getRecord(where: Prisma.RecordWhereUniqueInput) {
    return this.prismaService.record.findUnique({where});
  }

  async createRecord(data: {
    bookId: string;
    have: boolean;
    read: boolean;
    reading: boolean;
    user: {shortName: string};
  }) {
    const existRecord = await this.prismaService.record.findFirst({
      where: {
        bookId: data.bookId,
        user: {shortName: data.user.shortName},
      },
    });
    if (existRecord)
      throw new Error(
        `user ${data.user.shortName} already has a record for book ${data.bookId}`,
      );

    return this.prismaService.record.create({
      data: {
        ...data,
        user: {
          connect: data.user,
        },
      },
    });
  }

  async updateRecord(
    where: Prisma.RecordWhereUniqueInput,
    data: Prisma.RecordUpdateInput,
  ) {
    return this.prismaService.record.update({where, data});
  }

  async deleteRecord(where: Prisma.RecordWhereUniqueInput) {
    return this.prismaService.record.delete({where});
  }
}
