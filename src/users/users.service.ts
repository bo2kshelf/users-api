import {Injectable} from '@nestjs/common';
import {Prisma, User} from '@prisma/client';
import {PrismaService} from '../prisma/prisma.service';
@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async getRecords(
    where: Prisma.UserWhereUniqueInput,
    args: {
      cursor?: Prisma.FindManyRecordArgs['cursor'];
      skip?: number;
      take?: number;
      orderBy?: Pick<Prisma.RecordOrderByInput, 'createdAt' | 'updatedAt'>;
    },
  ) {
    return this.prismaService.user.findUnique({where}).records({...args});
  }

  async getRecordsCount(where: Prisma.UserWhereUniqueInput) {
    return this.prismaService.record.count({where: {user: where}});
  }

  async getUser(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where,
    });
  }

  async getUsers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByInput;
  }): Promise<User[]> {
    const {skip, take, cursor, where, orderBy} = params;
    return this.prismaService.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({data});
  }

  async updateUser(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.prismaService.user.update({where, data});
  }

  deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prismaService.user.delete({where});
  }
}
