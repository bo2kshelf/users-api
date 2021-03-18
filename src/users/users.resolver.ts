import {Inject, InternalServerErrorException, UseGuards} from '@nestjs/common';
import {ConfigType} from '@nestjs/config';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {User} from '@prisma/client';
import {CurrentUser} from '../auth/current-user.decorator';
import {GqlAuthnGuard} from '../auth/gql-authn.guard';
import {Permissions} from '../auth/permissions.decorator';
import {CommonConfig} from '../configs/common.config';
import {CreateUserArgs} from './dto/create-user.dto';
import {FindUserArgs} from './dto/find-user.dto';
import {UserEntity} from './user.entity';
import {UsersService} from './users.service';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(
    @Inject(CommonConfig.KEY)
    private readonly config: ConfigType<typeof CommonConfig>,
    private readonly usersService: UsersService,
  ) {}

  @ResolveField(() => String)
  picture(@Parent() {picture}: UserEntity) {
    return new URL(`/${picture}`, this.config.imageproxyBaseUrl).toString();
  }

  @Query(() => UserEntity, {name: 'user'})
  @Permissions('read:users')
  async findUser(@Args() args: FindUserArgs) {
    return this.usersService.findUser(args);
  }

  @Query(() => [UserEntity])
  @Permissions('read:users')
  async allUsers() {
    return this.usersService.allUsers();
  }

  @Query(() => UserEntity)
  @UseGuards(GqlAuthnGuard)
  @Permissions('read:myself')
  async currentUser(@CurrentUser() user: User): Promise<UserEntity | null> {
    const result = this.usersService.findUser({id: user.id});
    if (!result) throw new InternalServerErrorException();
    return result;
  }

  @Mutation(() => UserEntity)
  @Permissions('create:users')
  async createUser(@Args() args: CreateUserArgs) {
    return this.usersService.createUser(args);
  }
}
