import {ArgsType, Field, ID} from '@nestjs/graphql';

@ArgsType()
export class GetUserArgs {
  @Field(() => ID, {nullable: true})
  id!: number;

  @Field(() => ID, {nullable: true})
  userId!: string;
}
