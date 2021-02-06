import {Field, ID, ObjectType} from '@nestjs/graphql';

@ObjectType('User')
export class UserEntity {
  @Field(() => ID, {nullable: false})
  id!: string;
}
