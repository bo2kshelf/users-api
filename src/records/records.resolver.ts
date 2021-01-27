import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {Record} from '@prisma/client';
import {GqlAuthGuard} from '../auth/gql-auth.guard';
import {BookEntity} from '../book/book.entity';
import {CurrentUser, CurrentUserPayload} from '../users/current-user.decorator';
import {CreateRecordArgs} from './dto/create-record.dto';
import {DeleteRecordArgs} from './dto/delete-record.dto';
import {GetRecordArgs} from './dto/get-record.dto';
import {UpdateRecordArgs} from './dto/update-record.dto';
import {RecordEntity} from './record.entity';
import {RecordsService} from './records.service';

@Resolver(() => RecordEntity)
@UsePipes(new ValidationPipe({transform: true}))
@UseGuards(GqlAuthGuard)
export class RecordsResolver {
  constructor(private readonly recordsService: RecordsService) {}

  @ResolveField(() => BookEntity)
  book(@Parent() {bookId}: Record) {
    return {id: bookId};
  }

  @Query(() => RecordEntity)
  async record(
    @Args({type: () => GetRecordArgs})
    where: GetRecordArgs,
  ) {
    return this.recordsService.getRecord(where);
  }

  @Mutation(() => RecordEntity)
  async createRecord(
    @CurrentUser() currentUser: CurrentUserPayload,

    @Args({type: () => CreateRecordArgs})
    {user, data}: CreateRecordArgs,
  ) {
    if (
      !(await this.recordsService.isCurrentUserMe(currentUser, user.userName))
    )
      throw new UnauthorizedException({
        userName: user.userName,
      });

    if (!(await this.recordsService.isBookExist(data.bookId)))
      throw new NotFoundException({bookId: data.bookId});

    if (await this.recordsService.isAlreadyRecorded(user.userName, data.bookId))
      throw new ConflictException({
        userName: user.userName,
        bookId: data.bookId,
      });

    return this.recordsService.createRecord(user, data);
  }

  @Mutation(() => RecordEntity)
  async updateRecord(
    @CurrentUser() currentUser: CurrentUserPayload,

    @Args({type: () => UpdateRecordArgs})
    {where, data}: UpdateRecordArgs,
  ) {
    if (!(await this.recordsService.isExistRecord(where)))
      throw new NotFoundException({where});

    if (
      !(await this.recordsService.isCurrentUserRecordOwner(currentUser, where))
    )
      throw new UnauthorizedException({where});

    return this.recordsService.updateRecord(where, data);
  }

  @Mutation(() => RecordEntity)
  async deleteRecord(
    @CurrentUser() currentUser: CurrentUserPayload,

    @Args({type: () => DeleteRecordArgs})
    {where}: DeleteRecordArgs,
  ) {
    if (!(await this.recordsService.isExistRecord(where)))
      throw new NotFoundException({where});

    if (
      !(await this.recordsService.isCurrentUserRecordOwner(currentUser, where))
    )
      throw new UnauthorizedException({where});

    return this.recordsService.deleteRecord(where);
  }
}
