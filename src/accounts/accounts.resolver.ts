import {NotFoundException} from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import {AccountEntity} from './account.entity';
import {AccountsService} from './accounts.service';
import {CreateAccountArgs} from './dto/create-account.dto';
import {GetAccountArgs} from './dto/get-account.dto';

@Resolver(() => AccountEntity)
export class AccountsResolver {
  constructor(private readonly accountsService: AccountsService) {}

  @ResolveReference()
  resolveReference(reference: {__typename: string; id: string}) {
    return this.account({id: reference.id});
  }

  @Query(() => AccountEntity)
  async account(@Args({type: () => GetAccountArgs}) where: GetAccountArgs) {
    const result = await this.accountsService.getProfile(where);
    if (!result) throw new NotFoundException(where);
    return result;
  }

  @Query(() => [AccountEntity])
  async allAccounts() {
    return this.accountsService.getAllProfiles();
  }

  @Mutation(() => AccountEntity)
  async createProfile(
    @Args({type: () => CreateAccountArgs}) {data}: CreateAccountArgs,
  ) {
    return this.accountsService.createProfile(data);
  }
}
