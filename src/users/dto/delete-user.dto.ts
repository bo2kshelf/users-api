import {ArgsType, Field, ID, InputType} from '@nestjs/graphql';

@InputType()
export class DeleteUserWhereInput {
  @Field(() => ID, {nullable: true})
  id!: number;

  @Field(() => ID, {nullable: true})
  userId?: string;
}

@ArgsType()
export class DeleteUserArgs {
  @Field(() => DeleteUserWhereInput)
  where!: DeleteUserWhereInput;
}
