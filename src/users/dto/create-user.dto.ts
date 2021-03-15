import {ArgsType, Field} from '@nestjs/graphql';

@ArgsType()
export class CreateUserArgs {
  @Field(() => String)
  uniqueName!: string;

  @Field(() => String)
  displayName!: string;

  @Field(() => String)
  picture!: string;
}
