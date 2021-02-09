import {Inject} from '@nestjs/common';
import {ConfigType} from '@nestjs/config';
import {Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {CommonConfig} from '../configs/common.config';
import {GitHubUserEntity} from './github-user.entity';

@Resolver(() => GitHubUserEntity)
export class GitHubUsersResolver {
  constructor(
    @Inject(CommonConfig.KEY)
    private readonly config: ConfigType<typeof CommonConfig>,
  ) {}

  @ResolveField(() => String)
  picture(@Parent() {picture}: GitHubUserEntity) {
    return new URL(`/${picture}`, this.config.imageproxyBaseUrl).toString();
  }
}
