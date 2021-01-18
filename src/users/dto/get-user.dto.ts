import {ArgsType, Field, ID} from '@nestjs/graphql';

@ArgsType()
export class GetUserArgs {
  @Field(() => ID)
  shortName!: string;
}
