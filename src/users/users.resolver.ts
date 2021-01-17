import {UseGuards} from '@nestjs/common';
import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {GqlAuthGuard} from '../auth/gql-auth.guard';
import {Permissions} from '../auth/permissions.decorator';
import {PermissionsGuard} from '../auth/permissions.guard';
import {CurrentUser} from './current-user.decorator';
import {CreateUserArgs} from './dto/create-user.dto';
import {DeleteUserArgs} from './dto/delete-user.dto';
import {GetUserArgs} from './dto/get-user.dto';
import {UpdateUserArgs} from './dto/update-user.dto';
import {UserEntity} from './users.entity';
import {UsersService} from './users.service';

@Resolver(
  /* istanbul ignore next */
  () => UserEntity,
)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(
    /* istanbul ignore next */
    () => UserEntity,
    {nullable: true},
  )
  @Permissions('read:users')
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  async user(
    @Args({
      type:
        /* istanbul ignore next */
        () => GetUserArgs,
    })
    {id, userId}: GetUserArgs,
  ) {
    return this.usersService.getUser({id, userId});
  }

  @Query(
    /* istanbul ignore next */
    () => UserEntity,
    {nullable: false},
  )
  @Permissions('read:users')
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  async currentUser(@CurrentUser() {sub}: CurrentUser) {
    return this.usersService.getUser({sub});
  }

  @Mutation(
    /* istanbul ignore next */
    () => UserEntity,
    {nullable: false},
  )
  @Permissions('create:users')
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  async createUser(
    @CurrentUser() {sub}: CurrentUser,
    @Args({
      type:
        /* istanbul ignore next */
        () => CreateUserArgs,
    })
    {data}: CreateUserArgs,
  ) {
    return this.usersService.createUser({...data, sub});
  }

  @Mutation(
    /* istanbul ignore next */
    () => UserEntity,
    {nullable: false},
  )
  @Permissions('update:users')
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  async updateUser(
    @CurrentUser() {sub}: CurrentUser,
    @Args({
      type:
        /* istanbul ignore next */
        () => UpdateUserArgs,
    })
    {where, data}: UpdateUserArgs,
  ) {
    return this.usersService.updateUser(where, data);
  }

  @Mutation(
    /* istanbul ignore next */
    (returns) => UserEntity,
    {nullable: false},
  )
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('delete:users')
  async deleteUser(
    @CurrentUser() {sub}: CurrentUser,
    @Args({
      type:
        /* istanbul ignore next */
        () => DeleteUserArgs,
    })
    {where}: DeleteUserArgs,
  ) {
    return this.usersService.deleteUser(where);
  }
}
