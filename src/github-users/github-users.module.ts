import {Module} from '@nestjs/common';
import {PrismaModule} from '../prisma/prisma.module';
import {GitHubUsersService} from './github-users.service';

@Module({
  imports: [PrismaModule],
  providers: [GitHubUsersService],
  exports: [GitHubUsersService],
})
export class GitHubUsersModule {}
