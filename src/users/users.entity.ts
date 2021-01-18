import {Field, ID, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class UserEntity {
  @Field(() => ID)
  shortName!: string;

  @Field(() => String)
  displayName!: string;
}
