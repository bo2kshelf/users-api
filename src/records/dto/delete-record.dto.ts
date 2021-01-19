import {ArgsType, Field, ID, InputType} from '@nestjs/graphql';
import {IsNumberString} from 'class-validator';

@InputType()
export class DeleteRecordWhereInput {
  @Field(() => ID)
  @IsNumberString({
    no_symbols: true, // eslint-disable-line @typescript-eslint/naming-convention
  })
  id!: string;
}

@ArgsType()
export class DeleteRecordArgs {
  @Field(() => DeleteRecordWhereInput)
  where!: DeleteRecordWhereInput;
}
