import {Module} from '@nestjs/common';
import {GraphQLFederationModule} from '@nestjs/graphql';
import {AccountsModule} from './accounts/accounts.module';
import {AuthModule} from './auth/auth.module';
import {GitHubUsersModule} from './github-users/github-users.module';
import {PrismaModule} from './prisma/prisma.module';
import {UsersModule} from './users/users.module';

@Module({
  imports: [
    GraphQLFederationModule.forRoot({autoSchemaFile: true}),
    PrismaModule,
    AuthModule,
    UsersModule,
    GitHubUsersModule,
    AccountsModule,
  ],
})
export class AppModule {}
