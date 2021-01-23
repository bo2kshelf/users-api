import {
  HttpService,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {ConfigType} from '@nestjs/config';
import {
  Args,
  Context,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import Auth0Config from '../auth/auth0.config';
import {GqlAuthGuard} from '../auth/gql-auth.guard';
import {Permissions} from '../auth/permissions.decorator';
import {PermissionsGuard} from '../auth/permissions.guard';
import {RecordEntity} from '../records/record.entity';
import {CurrentUser, CurrentUserPayload} from './current-user.decorator';
import {UserRecordsArgs} from './dto/records.dto';
import {UpdateUserArgs} from './dto/update-user.dto';
import {UserArgs} from './dto/user.dto';
import {UserEntity} from './users.entity';
import {UsersService} from './users.service';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly httpService: HttpService,
    @Inject(Auth0Config.KEY)
    private readonly auth0Config: ConfigType<typeof Auth0Config>,
  ) {}

  @ResolveField(() => [RecordEntity])
  async records(
    @Parent() {userName}: UserEntity,
    @Args({type: () => UserRecordsArgs})
    {cursor, ...args}: UserRecordsArgs,
  ) {
    return this.usersService.getRecords(
      {userName},
      {
        ...args,
        cursor: cursor && {
          ...cursor,
          id: cursor.id ? parseInt(cursor.id, 10) : undefined,
        },
      },
    );
  }

  @ResolveField(() => Int)
  async recordsCount(@Parent() {userName}: UserEntity) {
    return this.usersService.getRecordsCount({userName});
  }

  @Query(() => UserEntity, {nullable: false})
  @Permissions('read:users')
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  async currentUser(
    @Context('req') req: any,
    @CurrentUser() {sub}: CurrentUserPayload,
  ): Promise<UserEntity> {
    const user = await this.usersService.getUser(sub);
    if (user?.profile) return user.profile;
    else
      return this.httpService
        .get(`${this.auth0Config.issuer}/userinfo`, {
          headers: {authorization: req.headers.authorization},
        })
        .toPromise()
        .then(({data: {name, picture}}) => ({picture, displayName: name}))
        .then((data) => this.usersService.ensureUser(sub, data))
        .then((profile) => {
          if (profile) return profile;
          throw new InternalServerErrorException();
        });
  }

  @Query(() => UserEntity)
  @Permissions('read:users')
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  async user(
    @Args({type: () => UserArgs})
    where: UserArgs,
  ) {
    const result = this.usersService.getProfile(where);
    if (!result) throw new NotFoundException(where);
    return result;
  }

  @Mutation(() => UserEntity, {nullable: false})
  @Permissions('update:users')
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  async updateUser(
    @CurrentUser() currentUser: CurrentUserPayload,
    @Args({type: () => UpdateUserArgs})
    {where, data}: UpdateUserArgs,
  ) {
    if (!(await this.usersService.isCurrentUserMe(currentUser, where.userName)))
      throw new UnauthorizedException({userName: where.userName});

    return this.usersService.updateProfile(where, data);
  }
}
