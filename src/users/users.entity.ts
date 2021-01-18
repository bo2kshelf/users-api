import {Field, ID, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class UserEntity {
  @Field(() => ID)
  userId!: string;

  @Field(() => String)
  displayName!: string;
}
