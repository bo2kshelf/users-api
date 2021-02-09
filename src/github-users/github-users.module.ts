import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {CommonConfig} from '../configs/common.config';
import {PrismaModule} from '../prisma/prisma.module';
import {GitHubUsersResolver} from './github-users.resolver';
import {GitHubUsersService} from './github-users.service';

@Module({
  imports: [ConfigModule.forFeature(CommonConfig), PrismaModule],
  providers: [GitHubUsersResolver, GitHubUsersService],
  exports: [GitHubUsersService],
})
export class GitHubUsersModule {}
