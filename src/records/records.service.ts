import {Inject, Injectable} from '@nestjs/common';
import {ConfigType} from '@nestjs/config';
import {Prisma} from '@prisma/client';
import {gql, request} from 'graphql-request';
import ExternalConfig from '../config/external.config';
import {PrismaService} from '../prisma/prisma.service';
import {CurrentUserPayload} from '../users/current-user.decorator';

@Injectable()
export class RecordsService {
  constructor(
    private prismaService: PrismaService,

    @Inject(ExternalConfig.KEY)
    private externalConfig: ConfigType<typeof ExternalConfig>,
  ) {}

  async isCurrentUserMe(
    currentUser: CurrentUserPayload,
    userName: string,
  ): Promise<boolean> {
    return this.prismaService.user
      .findUnique({where: {sub: currentUser.sub}, select: {profile: true}})
      .then((user) => user?.profile.userName === userName);
  }

  async isBookExist(id: string): Promise<boolean> {
    return request(
      this.externalConfig.booksApiEndpoint,
      gql`
        query($id: ID!) {
          book(id: $id) {
            id
          }
        }
      `,
      {id},
    )
      .then((data) => Boolean(data))
      .catch(() => false);
  }

  async isAlreadyRecorded(userName: string, bookId: string): Promise<boolean> {
    return this.prismaService.record
      .count({where: {bookId, profile: {userName}}})
      .then((count) => count !== 0);
  }

  async isExistRecord(where: Prisma.RecordWhereUniqueInput): Promise<boolean> {
    return this.prismaService.record
      .findUnique({where})
      .then((record) => Boolean(record));
  }

  async isCurrentUserRecordOwner(
    currentUser: CurrentUserPayload,
    where: Prisma.RecordWhereUniqueInput,
  ): Promise<boolean> {
    return this.prismaService.record
      .findUnique({where, select: {profile: {select: {user: true}}}})
      .then((record) => record?.profile?.user?.sub === currentUser.sub)
      .catch(() => false);
  }

  async getRecord(where: Prisma.RecordWhereUniqueInput) {
    return this.prismaService.record.findUnique({where});
  }

  async createRecord(
    profile: {userName: string},
    data: {
      bookId: string;
      have: boolean;
      read: boolean;
      reading: boolean;
    },
  ) {
    return this.prismaService.record.create({
      data: {
        ...data,
        profile: {connect: {userName: profile.userName}},
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
