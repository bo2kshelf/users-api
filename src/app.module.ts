import {Module} from '@nestjs/common';
import {GraphQLFederationModule} from '@nestjs/graphql';
import {AuthModule} from './auth/auth.module';
import {BooksModule} from './book/books.module';
import {GitHubUsersModule} from './github-users/github-users.module';
import {PrismaModule} from './prisma/prisma.module';
import {ProfilesModule} from './profiles/profiles.module';
import {RecordsModule} from './records/records.module';
import {UsersModule} from './users/users.module';

@Module({
  imports: [
    GraphQLFederationModule.forRoot({autoSchemaFile: true}),
    PrismaModule,
    AuthModule,
    UsersModule,
    GitHubUsersModule,
    ProfilesModule,
    BooksModule,
    RecordsModule,
  ],
})
export class AppModule {}
