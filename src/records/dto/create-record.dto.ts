import {ArgsType, Field, ID, InputType} from '@nestjs/graphql';
import {IsMongoId, ValidateNested} from 'class-validator';

@InputType()
export class CreateRecordUserInput {
  @Field(() => ID)
  userName!: string;
}

@InputType()
export class CreateRecordDataInput {
  @Field(() => ID)
  @IsMongoId()
  bookId!: string;

  @Field(() => Boolean)
  have!: boolean;

  @Field(() => Boolean)
  read!: boolean;

  @Field(() => Boolean)
  reading!: boolean;
}

@ArgsType()
export class CreateRecordArgs {
  @Field(() => CreateRecordUserInput, {nullable: false})
  @ValidateNested()
  user!: CreateRecordUserInput;

  @Field(() => CreateRecordDataInput, {nullable: false})
  @ValidateNested()
  data!: CreateRecordDataInput;
}
