import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {PrismaModule} from '../prisma/prisma.module';
import {AccountsConfig} from './accounts.config';
import {AccountsResolver} from './accounts.resolver';
import {AccountsService} from './accounts.service';

@Module({
  imports: [ConfigModule.forFeature(AccountsConfig), PrismaModule],
  providers: [AccountsResolver, AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
