import {Module} from '@nestjs/common';
import {PrismaModule} from '../prisma/prisma.module';
import {AccountsResolver} from './accounts.resolver';
import {AccountsService} from './accounts.service';

@Module({
  imports: [PrismaModule],
  providers: [AccountsResolver, AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
