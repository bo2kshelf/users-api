import {ArgsType, Field, ID} from '@nestjs/graphql';

@ArgsType()
export class GetRecordArgs {
  @Field(() => ID)
  id!: string;
}
