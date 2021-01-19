import {UsePipes, ValidationPipe} from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {Record} from '@prisma/client';
import {BookEntity} from '../book/book.entity';
import {CreateRecordArgs} from './dto/create-record.dto';
import {DeleteRecordArgs} from './dto/delete-record.dto';
import {GetRecordArgs} from './dto/get-record.dto';
import {UpdateRecordArgs} from './dto/update-record.dto';
import {RecordEntity} from './record.entity';
import {RecordsService} from './records.service';

@Resolver(() => RecordEntity)
@UsePipes(new ValidationPipe({transform: true}))
export class RecordsResolver {
  constructor(private readonly recordsService: RecordsService) {}

  @ResolveField(() => BookEntity)
  book(@Parent() {bookId}: Record) {
    return {id: bookId};
  }

  @Query(() => RecordEntity)
  record(
    @Args({type: () => GetRecordArgs})
    {id}: GetRecordArgs,
  ) {
    return this.recordsService.getRecord({
      id: parseInt(id, 10),
    });
  }

  @Mutation(() => RecordEntity)
  createRecord(
    @Args({type: () => CreateRecordArgs})
    {data: {user, ...data}}: CreateRecordArgs,
  ) {
    return this.recordsService.createRecord({
      ...data,
      user,
    });
  }

  @Mutation(() => RecordEntity)
  updateRecord(
    @Args({type: () => UpdateRecordArgs})
    {where, data}: UpdateRecordArgs,
  ) {
    return this.recordsService.updateRecord(
      {
        id: parseInt(where.id, 10),
      },
      data,
    );
  }

  @Mutation(() => RecordEntity)
  deleteRecord(
    @Args({type: () => DeleteRecordArgs})
    {where}: DeleteRecordArgs,
  ) {
    return this.recordsService.deleteRecord({
      id: parseInt(where.id, 10),
    });
  }
}
