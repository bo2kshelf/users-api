import {Field, ID, ObjectType} from '@nestjs/graphql';

@ObjectType('User')
export class UserEntity {
  @Field(() => ID)
  userName!: string;

  @Field(() => String)
  displayName!: string;
}
