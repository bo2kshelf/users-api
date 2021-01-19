import {ArgsType, Field, ID, InputType} from '@nestjs/graphql';
import {IsMongoId, Max, Min, ValidateNested} from 'class-validator';

@InputType()
export class CreateRecordDataUserInput {
  @Field(() => ID)
  @Min(3)
  @Max(16)
  shortName!: string;
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

  @Field(() => CreateRecordDataUserInput)
  @ValidateNested()
  user!: CreateRecordDataUserInput;
}

@ArgsType()
export class CreateRecordArgs {
  @Field(() => CreateRecordDataInput, {nullable: false})
  @ValidateNested()
  data!: CreateRecordDataInput;
}
