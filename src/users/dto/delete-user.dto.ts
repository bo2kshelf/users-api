import {ArgsType, Field, ID, InputType} from '@nestjs/graphql';

@InputType()
export class DeleteUserWhereInput {
  @Field(() => ID)
  userName!: string;
}

@ArgsType()
export class DeleteUserArgs {
  @Field(() => DeleteUserWhereInput)
  where!: DeleteUserWhereInput;
}
