import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {CreateRecordArgs} from './dto/create-record.dto';
import {DeleteRecordArgs} from './dto/delete-record.dto';
import {GetRecordArgs} from './dto/get-record.dto';
import {UpdateRecordArgs} from './dto/update-record.dto';
import {RecordEntity} from './record.entity';
import {RecordsService} from './records.service';

@Resolver(() => RecordEntity)
export class RecordsResolver {
  constructor(private readonly recordsService: RecordsService) {}

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
      user: {connect: user},
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
