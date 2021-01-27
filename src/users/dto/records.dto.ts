/* eslint-disable @shopify/typescript/prefer-pascal-case-enums */
import {
  ArgsType,
  Field,
  ID,
  InputType,
  Int,
  registerEnumType,
} from '@nestjs/graphql';
import {IsInt, Validate, ValidateNested} from 'class-validator';
import {CannotUseWith} from '../../validators/cannot-use-with.validator';

export enum UserRecordsArgsOrderByEnum {
  ASC = 'asc',
  DESC = 'desc',
}

registerEnumType(UserRecordsArgsOrderByEnum, {
  name: 'UserRecordsArgsOrderByEnum',
});

@InputType()
export class UserRecordsArgsOrderBy {
  @Field(() => UserRecordsArgsOrderByEnum, {nullable: true})
  @Validate(CannotUseWith, ['updatedAt'])
  createdAt?: UserRecordsArgsOrderByEnum;

  @Field(() => UserRecordsArgsOrderByEnum, {nullable: true})
  @Validate(CannotUseWith, ['createdAt'])
  updatedAt?: UserRecordsArgsOrderByEnum;
}

@InputType()
export class UserRecordsArgsCursor {
  @Field(() => ID)
  id!: string;
}

@InputType()
export class UserRecordsArgsWhere {
  @Field(() => Boolean, {nullable: true})
  have?: boolean;

  @Field(() => Boolean, {nullable: true})
  read?: boolean;

  @Field(() => Boolean, {nullable: true})
  reading?: boolean;
}

@ArgsType()
export class UserRecordsArgs {
  @Field(() => UserRecordsArgsCursor, {nullable: true})
  @ValidateNested()
  cursor?: UserRecordsArgsCursor;

  @Field(() => Int, {nullable: true})
  @IsInt()
  skip?: number;

  @Field(() => Int, {nullable: true})
  @IsInt()
  take?: number;

  @Field(() => UserRecordsArgsOrderBy, {nullable: true})
  orderBy?: UserRecordsArgsOrderBy;

  @Field(() => UserRecordsArgsWhere, {nullable: true})
  where?: UserRecordsArgsWhere;
}
