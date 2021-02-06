import {ArgsType, Field} from '@nestjs/graphql';

@ArgsType()
export class LoginGitHubArgs {
  @Field(() => String)
  code!: string;
}
