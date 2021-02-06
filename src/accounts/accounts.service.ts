import {Injectable} from '@nestjs/common';
import {Prisma} from '@prisma/client';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class AccountsService {
  constructor(private prismaService: PrismaService) {}

  getAccount(where: Prisma.AccountWhereUniqueInput) {
    return this.prismaService.account.findUnique({where});
  }

  getAllAccounts() {
    return this.prismaService.account.findMany();
  }

  createAccount({
    userId,
    ...data
  }: {
    userName: string;
    displayName: string;
    picture: string;
    userId: string;
  }) {
    return this.prismaService.account.create({
      data: {
        ...data,
        user: {connect: {id: userId}},
      },
    });
  }
}
