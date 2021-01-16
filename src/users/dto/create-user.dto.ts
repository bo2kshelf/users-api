import {ArgsType, Field, ID, InputType} from '@nestjs/graphql';
import {IsAlphanumeric, Length} from 'class-validator';

@InputType()
export class CreateUserDataInput {
  @Field(() => ID)
  @IsAlphanumeric()
  @Length(1, 32)
  userId!: string;

  @Field(() => String)
  @Length(1, 32)
  displayName!: string;

  @Field(() => String)
  password!: string;
}

@ArgsType()
export class CreateUserArgs {
  @Field(() => CreateUserDataInput, {nullable: false})
  data!: CreateUserDataInput;
}
