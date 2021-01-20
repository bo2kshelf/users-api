import {
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {User} from '@prisma/client';
import {GqlAuthGuard} from '../auth/gql-auth.guard';
import {Permissions} from '../auth/permissions.decorator';
import {PermissionsGuard} from '../auth/permissions.guard';
import {RecordEntity} from '../records/record.entity';
import {CurrentUser, CurrentUserPayload} from './current-user.decorator';
import {CreateUserArgs} from './dto/create-user.dto';
import {DeleteUserArgs} from './dto/delete-user.dto';
import {UserRecordsArgs} from './dto/records.dto';
import {UpdateUserArgs} from './dto/update-user.dto';
import {UserArgs} from './dto/user.dto';
import {UserEntity} from './users.entity';
import {UsersService} from './users.service';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @ResolveField(() => [RecordEntity])
  async records(
    @Parent() {id}: User,

    @Args({type: () => UserRecordsArgs})
    {cursor, where, ...args}: UserRecordsArgs,
  ) {
    return this.usersService.getRecords(
      {id},
      {
        ...args,
        cursor: cursor && {
          ...cursor,
          id: cursor.id ? parseInt(cursor.id, 10) : undefined,
        },
        where: where && {
          ...where,
          id: where.id ? parseInt(where.id, 10) : undefined,
        },
      },
    );
  }

  @ResolveField(() => Int)
  async recordsCount(@Parent() {id}: User) {
    return this.usersService.getRecordsCount({id});
  }

  @Query(() => UserEntity)
  @Permissions('read:users')
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  async user(
    @Args({type: () => UserArgs})
    where: UserArgs,
  ) {
    const result = this.usersService.getUser(where);
    if (!result) throw new NotFoundException(where);
    return result;
  }

  @Query(() => UserEntity, {nullable: false})
  @Permissions('read:users')
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  async currentUser(@CurrentUser() {sub}: CurrentUserPayload) {
    return this.usersService.getUser({sub});
  }

  @Mutation(() => UserEntity, {nullable: false})
  @Permissions('create:users')
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  async createUser(
    @CurrentUser() {sub}: CurrentUserPayload,
    @Args({
      type: () => CreateUserArgs,
    })
    {data}: CreateUserArgs,
  ) {
    return this.usersService.createUser({...data, sub});
  }

  @Mutation(() => UserEntity, {nullable: false})
  @Permissions('update:users')
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  async updateUser(
    @CurrentUser() currentUser: CurrentUserPayload,
    @Args({
      type: () => UpdateUserArgs,
    })
    {where, data}: UpdateUserArgs,
  ) {
    if (!(await this.usersService.checkCurrentUserIsItself(currentUser, where)))
      throw new UnauthorizedException([where]);
    return this.usersService.updateUser(where, data);
  }

  @Mutation((returns) => UserEntity, {nullable: false})
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @Permissions('delete:users')
  async deleteUser(
    @CurrentUser() currentUser: CurrentUserPayload,
    @Args({
      type: () => DeleteUserArgs,
    })
    {where}: DeleteUserArgs,
  ) {
    if (!(await this.usersService.checkCurrentUserIsItself(currentUser, where)))
      throw new UnauthorizedException([where]);
    return this.usersService.deleteUser(where);
  }
}
