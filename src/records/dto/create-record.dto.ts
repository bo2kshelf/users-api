import {ArgsType, Field, ID, InputType} from '@nestjs/graphql';
import {IsMongoId} from 'class-validator';

@InputType()
export class CreateRecordDataUserInput {
  @Field(() => ID)
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
  user!: CreateRecordDataUserInput;
}

@ArgsType()
export class CreateRecordArgs {
  @Field(() => CreateRecordDataInput, {nullable: false})
  data!: CreateRecordDataInput;
}
