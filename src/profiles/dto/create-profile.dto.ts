import {ArgsType, Field, ID, InputType} from '@nestjs/graphql';
import {IsAlphanumeric, IsUrl, Length} from 'class-validator';

@InputType()
export class CreateProfileDataInput {
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
}

@ArgsType()
export class CreateProfileArgs {
  @Field(() => CreateProfileDataInput, {nullable: false})
  data!: CreateProfileDataInput;
}
