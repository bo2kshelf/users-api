import {ArgsType, Field, ID, InputType} from '@nestjs/graphql';

@InputType()
export class UpdateRecordDataUserInput {
  @Field(() => ID)
  id!: string;
}

@InputType()
export class UpdateRecordDataInput {
  @Field(() => Boolean, {nullable: true})
  have?: boolean;

  @Field(() => Boolean, {nullable: true})
  read?: boolean;

  @Field(() => Boolean, {nullable: true})
  reading?: boolean;
}

@ArgsType()
export class UpdateRecordArgs {
  @Field(() => UpdateRecordDataUserInput)
  where!: UpdateRecordDataUserInput;

  @Field(() => UpdateRecordDataInput)
  data!: UpdateRecordDataInput;
}
