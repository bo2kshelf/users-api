import {ArgsType, Field, ID} from '@nestjs/graphql';

@ArgsType()
export class GetAccountArgs {
  @Field(() => ID, {nullable: true})
  id?: string;

  @Field(() => ID, {nullable: true})
  userName?: string;
}
