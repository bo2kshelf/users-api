import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {CommonConfig} from '../configs/common.config';
import {PrismaModule} from '../prisma/prisma.module';
import {AccountsResolver} from './accounts.resolver';
import {AccountsService} from './accounts.service';

@Module({
  imports: [ConfigModule.forFeature(CommonConfig), PrismaModule],
  providers: [AccountsResolver, AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
