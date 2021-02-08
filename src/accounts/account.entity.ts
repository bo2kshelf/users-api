import {Directive, Field, ID, ObjectType} from '@nestjs/graphql';

@ObjectType('Account')
@Directive('@key(fields: "id")')
export class AccountEntity {
  @Field(() => ID)
  id!: string;

  @Field(() => ID)
  userName!: string;

  @Field(() => String)
  displayName!: string;

  picture!: string;
}
