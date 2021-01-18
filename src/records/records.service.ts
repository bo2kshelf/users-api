import {Injectable} from '@nestjs/common';
import {Prisma} from '@prisma/client';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class RecordsService {
  constructor(private prismaService: PrismaService) {}

  async getRecord(where: Prisma.RecordWhereUniqueInput) {
    return this.prismaService.record.findUnique({where});
  }

  async createRecord(data: Prisma.RecordCreateInput) {
    return this.prismaService.record.create({data});
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
