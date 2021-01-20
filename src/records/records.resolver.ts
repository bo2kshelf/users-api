import {
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
    {id}: GetRecordArgs,
  ) {
    return this.recordsService.getRecord({
      id: parseInt(id, 10),
    });
  }

  @Mutation(() => RecordEntity)
  async createRecord(
    @Args({type: () => CreateRecordArgs})
    {data: {user, ...data}}: CreateRecordArgs,
  ) {
    if (!(await this.recordsService.checkIfBookExist(data.bookId)))
      throw new NotFoundException({bookId: data.bookId});
    return this.recordsService.createRecord({
      ...data,
      user,
    });
  }

  @Mutation(() => RecordEntity)
  async updateRecord(
    @CurrentUser() currentUser: CurrentUserPayload,

    @Args({type: () => UpdateRecordArgs})
    {where, data}: UpdateRecordArgs,
  ) {
    const parsedWhere = {id: parseInt(where.id, 10)};
    if (
      !(await this.recordsService.checkCurrentUserIsRecordOwner(
        currentUser,
        parsedWhere,
      ))
    )
      throw new UnauthorizedException([where]);
    return this.recordsService.updateRecord(parsedWhere, data);
  }

  @Mutation(() => RecordEntity)
  async deleteRecord(
    @CurrentUser() currentUser: CurrentUserPayload,

    @Args({type: () => DeleteRecordArgs})
    {where}: DeleteRecordArgs,
  ) {
    const parsedWhere = {id: parseInt(where.id, 10)};
    if (
      !(await this.recordsService.checkCurrentUserIsRecordOwner(
        currentUser,
        parsedWhere,
      ))
    )
      throw new UnauthorizedException([where]);

    return this.recordsService.deleteRecord(parsedWhere);
  }
}
