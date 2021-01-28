import {Module} from '@nestjs/common';
import {GraphQLFederationModule} from '@nestjs/graphql';
import {AuthModule} from './auth/auth.module';
import {BooksModule} from './book/books.module';
import {PrismaModule} from './prisma/prisma.module';
import {ProfilesModule} from './profiles/profiles.module';
import {RecordsModule} from './records/records.module';

@Module({
  imports: [
    GraphQLFederationModule.forRoot({autoSchemaFile: true}),
    PrismaModule,
    ProfilesModule,
    RecordsModule,
    BooksModule,
    AuthModule,
  ],
})
export class AppModule {}
