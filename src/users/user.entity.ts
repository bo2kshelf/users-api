import {Directive, Field, ID, ObjectType} from '@nestjs/graphql';

@ObjectType('User')
@Directive('@key(fields: "id")')
export class UserEntity {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  uniqueName!: string;

  @Field(() => String)
  displayName!: string;

  picture!: string;
}
