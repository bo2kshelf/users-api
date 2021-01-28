import {Directive, Field, ID, ObjectType} from '@nestjs/graphql';

@ObjectType('Profile')
@Directive('@key(fields: "id")')
export class ProfileEntity {
  @Field(() => ID)
  id!: string;

  @Field(() => ID)
  userName!: string;

  @Field(() => String)
  displayName!: string;

  @Field(() => String)
  picture!: string;
}
