import {Inject, NotFoundException} from '@nestjs/common';
import {ConfigType} from '@nestjs/config';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import {AccountEntity} from './account.entity';
import {AccountsConfig} from './accounts.config';
import {AccountsService} from './accounts.service';
import {CreateAccountArgs} from './dto/create-account.dto';
import {GetAccountArgs} from './dto/get-account.dto';

@Resolver(() => AccountEntity)
export class AccountsResolver {
  constructor(
    @Inject(AccountsConfig.KEY)
    private readonly config: ConfigType<typeof AccountsConfig>,
    private readonly accountsService: AccountsService,
  ) {}

  @ResolveReference()
  resolveReference(reference: {__typename: string; id: string}) {
    return this.account({id: reference.id});
  }

  @ResolveField(() => String)
  picture(@Parent() {picture}: AccountEntity) {
    return new URL(`/${picture}`, this.config.pictureProxyBaseUrl).toString();
  }

  @Query(() => AccountEntity)
  async account(@Args({type: () => GetAccountArgs}) where: GetAccountArgs) {
    const result = await this.accountsService.getAccount(where);
    if (!result) throw new NotFoundException(where);
    return result;
  }

  @Query(() => [AccountEntity])
  async allAccounts() {
    return this.accountsService.getAllAccounts();
  }

  @Mutation(() => AccountEntity)
  async createAccount(
    @Args({type: () => CreateAccountArgs}) {data}: CreateAccountArgs,
  ) {
    return this.accountsService.createAccount(data);
  }
}
