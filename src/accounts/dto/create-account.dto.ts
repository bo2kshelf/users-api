import {ArgsType, Field, ID, InputType} from '@nestjs/graphql';
import {IsAlphanumeric, IsUrl, Length} from 'class-validator';

@InputType()
export class CreateAccountDataInput {
  @Field(() => ID)
  @IsAlphanumeric()
  @Length(1, 32)
  userName!: string;

  @Field(() => String)
  @Length(1, 32)
  displayName!: string;

  @Field(() => String)
  @IsUrl()
  picture!: string;

  @Field(() => ID)
  userId!: string;
}

@ArgsType()
export class CreateAccountArgs {
  @Field(() => CreateAccountDataInput, {nullable: false})
  data!: CreateAccountDataInput;
}
