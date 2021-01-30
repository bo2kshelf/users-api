import {UnauthorizedException, UseGuards} from '@nestjs/common';
import {Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {GqlAuthGuard} from '../auth/gql-auth.guard';
import {GitHubUserEntity} from '../github-users/github-user.entity';
import {ProfileEntity} from '../profiles/profile.entity';
import {CurrentUser, CurrentUserPayload} from './current-user.decorator';
import {UserEntity} from './users.entity';
import {UsersService} from './users.service';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @ResolveField(() => ProfileEntity, {nullable: true})
  async profile(@Parent() {id}: UserEntity): Promise<{id: string} | null> {
    return this.usersService.getProfile({id});
  }

  @ResolveField(() => GitHubUserEntity, {nullable: true})
  @UseGuards(GqlAuthGuard)
  async github(@Parent() {id}: UserEntity): Promise<{id: string} | null> {
    return this.usersService.getGitHubUser({id});
  }

  @Query(() => UserEntity)
  @UseGuards(GqlAuthGuard)
  async currentUser(
    @CurrentUser() {id}: CurrentUserPayload,
  ): Promise<UserEntity | null> {
    const user = await this.usersService.getUser({id});
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
