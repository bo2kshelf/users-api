import {ObjectType} from '@nestjs/graphql';

@ObjectType('GitHubAuthPayload')
export class GitHubAuthPayloadEntity {
  githubCredential!: {accessToken: string; tokenType: string; scope?: string};
}
