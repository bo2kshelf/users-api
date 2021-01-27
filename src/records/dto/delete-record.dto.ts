import {ArgsType, Field, ID, InputType} from '@nestjs/graphql';

@InputType()
export class DeleteRecordWhereInput {
  @Field(() => ID)
  id!: string;
}

@ArgsType()
export class DeleteRecordArgs {
  @Field(() => DeleteRecordWhereInput)
  where!: DeleteRecordWhereInput;
}
