import {ArgsType, Field, ID, InputType} from '@nestjs/graphql';

@InputType()
export class DeleteUserWhereInput {
  @Field(() => ID)
  userId!: string;
}

@ArgsType()
export class DeleteUserArgs {
  @Field(() => DeleteUserWhereInput)
  where!: DeleteUserWhereInput;
}
