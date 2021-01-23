import {HttpModule, Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import Auth0Config from '../auth/auth0.config';
import {PrismaModule} from '../prisma/prisma.module';
import {UsersResolver} from './users.resolver';
import {UsersService} from './users.service';

@Module({
  imports: [ConfigModule.forFeature(Auth0Config), PrismaModule, HttpModule],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
