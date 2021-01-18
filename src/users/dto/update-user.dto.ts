import {ArgsType, Field, ID, InputType} from '@nestjs/graphql';
import {IsAlphanumeric, Length} from 'class-validator';

@InputType()
export class UpdateUserWhereInput {
  @Field(() => ID)
  shortName!: string;
}

@InputType()
export class UpdateUserDataInput {
  @Field(() => ID, {nullable: true})
  @IsAlphanumeric()
  @Length(1, 32)
  shortName?: string;

  @Field(() => String, {nullable: true})
  @Length(1, 32)
  displayName?: string;
}

@ArgsType()
export class UpdateUserArgs {
  @Field(() => UpdateUserWhereInput)
  where!: UpdateUserWhereInput;

  @Field(() => UpdateUserDataInput)
  data!: UpdateUserDataInput;
}
