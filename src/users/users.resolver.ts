import {UseGuards} from '@nestjs/common';
import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {GqlAuthGuard} from '../auth/gql-auth.guard';
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
  @UseGuards(GqlAuthGuard)
  async currentUser(@CurrentUser() user: {userId: string}) {
    return this.usersService.getUser(user);
  }

  @Mutation(
    /* istanbul ignore next */
    () => UserEntity,
    {nullable: false},
  )
  async createUser(
    @Args({
      type:
        /* istanbul ignore next */
        () => CreateUserArgs,
    })
    {data}: CreateUserArgs,
  ) {
    return this.usersService.createUser(data);
  }

  @Mutation(
    /* istanbul ignore next */
    () => UserEntity,
    {nullable: false},
  )
  async updateUser(
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
  async deleteUser(
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
