import {Module} from '@nestjs/common';
import {GraphQLFederationModule} from '@nestjs/graphql';
import {AuthModule} from './auth/auth.module';
import {PrismaModule} from './prisma/prisma.module';
import {RecordsModule} from './records/records.module';
import {UsersModule} from './users/users.module';

@Module({
  imports: [
    GraphQLFederationModule.forRoot({autoSchemaFile: true}),
    PrismaModule,
    UsersModule,
    RecordsModule,
    AuthModule,
  ],
})
export class AppModule {}
