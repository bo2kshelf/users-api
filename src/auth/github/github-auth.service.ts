/* eslint-disable @typescript-eslint/naming-convention */
import {HttpService, Inject, Injectable} from '@nestjs/common';
import {ConfigType} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';
import {stringify} from 'querystringify';
import {GitHubAuthConfig} from './github-auth.config';

@Injectable()
export class GitHubAuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,

    @Inject(GitHubAuthConfig.KEY)
    private readonly config: ConfigType<typeof GitHubAuthConfig>,
  ) {}

  getLoginGitHubUrl() {
    const query = stringify(
      {client_id: this.config.clientId, scope: 'user'},
      true,
    );
    return `https://github.com/login/oauth/authorize${query}`;
  }

  async loginGitHub(
    code: string,
  ): Promise<{
    access_token: string;
    token_type: string;
    scope?: string;
  }> {
    return this.httpService
      .post(
        `https://github.com/login/oauth/access_token`,
        JSON.stringify({
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          code,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      )
      .toPromise()
      .then(({data}) => {
        if (data?.error) throw new Error(JSON.stringify(data));
        return data;
      });
  }

  async fetchGitHubProfile({
    accessToken,
    tokenType,
  }: {
    accessToken: string;
    tokenType: string;
  }): Promise<{
    id: number /* id */;
    login: string /* userName */;
    name: string /* displayName */;
    avatar_url: string /*  picture */;
    html_url: string /*  githubUrl */;
    bio?: string /*  bio */;
    twitter_username?: string /*  twitterUserName */;
  }> {
    return this.httpService
      .get(`https://api.github.com/user`, {
        headers: {Authorization: `${tokenType} ${accessToken}`},
      })
      .toPromise()
      .then(({data}) => data);
  }

  async createAccessToken({id}: {id: string}) {
    return this.jwtService.sign({id});
  }
}
