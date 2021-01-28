/* eslint-disable @shopify/typescript/prefer-pascal-case-enums */
import {
  ArgsType,
  Field,
  ID,
  InputType,
  Int,
  registerEnumType,
} from '@nestjs/graphql';
import {IsInt, IsNumberString, Validate, ValidateNested} from 'class-validator';
import {CannotUseWith} from '../../validators/cannot-use-with.validator';

export enum ProfileRecordsArgsOrderByEnum {
  ASC = 'asc',
  DESC = 'desc',
}

registerEnumType(ProfileRecordsArgsOrderByEnum, {
  name: 'ProfileRecordsArgsOrderByEnum',
});

@InputType()
export class ProfileRecordsArgsOrderBy {
  @Field(() => ProfileRecordsArgsOrderByEnum, {nullable: true})
  @Validate(CannotUseWith, ['updatedAt'])
  createdAt?: ProfileRecordsArgsOrderByEnum;

  @Field(() => ProfileRecordsArgsOrderByEnum, {nullable: true})
  @Validate(CannotUseWith, ['createdAt'])
  updatedAt?: ProfileRecordsArgsOrderByEnum;
}

@InputType()
export class ProfileRecordsArgsCursor {
  @Field(() => ID)
  @IsNumberString({
    no_symbols: true, // eslint-disable-line @typescript-eslint/naming-convention
  })
  id!: string;
}

@InputType()
export class ProfileRecordsArgsWhere {
  @Field(() => Boolean, {nullable: true})
  have?: boolean;

  @Field(() => Boolean, {nullable: true})
  read?: boolean;

  @Field(() => Boolean, {nullable: true})
  reading?: boolean;
}

@ArgsType()
export class ProfileRecordsArgs {
  @Field(() => ProfileRecordsArgsCursor, {nullable: true})
  @ValidateNested()
  cursor?: ProfileRecordsArgsCursor;

  @Field(() => Int, {nullable: true})
  @IsInt()
  skip?: number;

  @Field(() => Int, {nullable: true})
  @IsInt()
  take?: number;

  @Field(() => ProfileRecordsArgsOrderBy, {nullable: true})
  orderBy?: ProfileRecordsArgsOrderBy;

  @Field(() => ProfileRecordsArgsWhere, {nullable: true})
  where?: ProfileRecordsArgsWhere;
}
