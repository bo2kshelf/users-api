import {Field, ID, ObjectType} from '@nestjs/graphql';

@ObjectType('GitHubUser')
export class GitHubUserEntity {
  @Field(() => ID, {nullable: false})
  githubId!: string;

  @Field(() => ID, {nullable: false})
  userName!: string;

  @Field(() => String, {nullable: false})
  displayName!: string;

  picture!: string;
}
