import {Field, ID, ObjectType} from '@nestjs/graphql';

@ObjectType('User')
export class UserEntity {
  @Field(() => ID)
  shortName!: string;

  @Field(() => String)
  displayName!: string;
}
