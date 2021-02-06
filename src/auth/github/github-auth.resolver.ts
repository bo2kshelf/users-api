/* eslint-disable @typescript-eslint/naming-convention */
import {
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {GitHubUsersService} from '../../github-users/github-users.service';
import {UserEntity} from '../../users/users.entity';
import {LoginGitHubArgs} from './dto/login-github.dto';
import {GitHubAuthPayloadEntity} from './github-auth-payload.entity';
import {GitHubAuthService} from './github-auth.service';

@Resolver(() => GitHubAuthPayloadEntity)
export class GitHubAuthResolver {
  constructor(
    private readonly authService: GitHubAuthService,
    private readonly githubUsersService: GitHubUsersService,
  ) {}

  @ResolveField(() => UserEntity)
  async user(
    @Parent() {githubCredential}: GitHubAuthPayloadEntity,
  ): Promise<UserEntity> {
    return this.authService
      .fetchGitHubProfile(githubCredential)
      .then(({id, login, name, avatar_url}) => ({
        githubId: String(id),
        userName: login,
        displayName: name,
        picture: avatar_url,
      }))
      .then(({githubId, ...data}) =>
        this.githubUsersService.ensureUser({githubId}, data),
      )
      .then((user) => {
        if (user) return user;
        throw new InternalServerErrorException();
      });
  }

  @ResolveField(() => String)
  async accessToken(
    @Parent() parent: GitHubAuthPayloadEntity,
  ): Promise<string> {
    return this.user(parent).then((user) =>
      this.authService.createAccessToken(user),
    );
  }

  @Query(() => String)
  async loginGitHubUrl() {
    return this.authService.getLoginGitHubUrl();
  }

  @Mutation(() => GitHubAuthPayloadEntity)
  async loginGitHub(
    @Args({type: () => LoginGitHubArgs}) {code}: LoginGitHubArgs,
  ): Promise<GitHubAuthPayloadEntity> {
    return this.authService
      .loginGitHub(code)
      .then(({access_token, token_type, ...rest}) => {
        return {
          githubCredential: {
            ...rest,
            accessToken: access_token,
            tokenType: token_type,
          },
        };
      })
      .catch((error) => {
        throw new UnauthorizedException(error);
      });
  }
}
