import {ArgsType, Field} from '@nestjs/graphql';

@ArgsType()
export class FindUserArgs {
  @Field(() => String, {nullable: true})
  id?: string;

  @Field(() => String, {nullable: true})
  uniqueName?: string;
}
