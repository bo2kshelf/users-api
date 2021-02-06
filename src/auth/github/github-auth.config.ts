import {registerAs} from '@nestjs/config';

export const GitHubAuthConfig = registerAs('github-auth', () => ({
  clientId: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
}));
