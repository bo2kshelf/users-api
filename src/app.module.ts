import {Module} from '@nestjs/common';
import {ConfigModule, ConfigType} from '@nestjs/config';
import {APP_GUARD} from '@nestjs/core';
import {GraphQLFederationModule} from '@nestjs/graphql';
import {JwtModule} from '@nestjs/jwt';
import {AuthConfig} from './auth/auth.config';
import {AuthModule} from './auth/auth.module';
import {GqlAuthzGuard} from './auth/gql-authz.guard';
import {PrismaModule} from './prisma/prisma.module';
import {UsersModule} from './users/users.module';

@Module({
  imports: [
    GraphQLFederationModule.forRoot({autoSchemaFile: true}),
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(AuthConfig)],
      inject: [AuthConfig.KEY],
      useFactory: async (config: ConfigType<typeof AuthConfig>) => ({
        secret: config.jwt.secret,
      }),
    }),
    AuthModule,
    UsersModule,
  ],
  providers: [{provide: APP_GUARD, useClass: GqlAuthzGuard}],
})
export class AppModule {}
