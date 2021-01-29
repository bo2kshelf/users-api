import {HttpModule, Module} from '@nestjs/common';
import {ConfigModule, ConfigType} from '@nestjs/config';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {GitHubUsersModule} from '../github-users/github-users.module';
import {UsersModule} from '../users/users.module';
import {AuthConfig} from './auth.config';
import {GitHubAuthConfig} from './github/github-auth.config';
import {GitHubAuthResolver} from './github/github-auth.resolver';
import {GitHubAuthService} from './github/github-auth.service';
import {JwtStrategy} from './jwt.strategy';

@Module({
  imports: [
    HttpModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(AuthConfig)],
      inject: [AuthConfig.KEY],
      useFactory: async (authConfig: ConfigType<typeof AuthConfig>) => ({
        secret: authConfig.jwt.secret,
        signOptions: {expiresIn: 60 * 60 * 2},
      }),
    }),
    ConfigModule.forFeature(AuthConfig),
    ConfigModule.forFeature(GitHubAuthConfig),
    UsersModule,
    GitHubUsersModule,
  ],
  providers: [JwtStrategy, GitHubAuthService, GitHubAuthResolver],
})
export class AuthModule {}
