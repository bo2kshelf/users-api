import {Field, GraphQLISODateTime, ID, ObjectType} from '@nestjs/graphql';

@ObjectType('Record')
export class RecordEntity {
  @Field(() => ID)
  id!: string;

  @Field(() => Boolean)
  have!: boolean;

  @Field(() => Boolean)
  read!: boolean;

  @Field(() => Boolean)
  reading!: boolean;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}
