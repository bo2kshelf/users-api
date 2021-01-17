import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {PassportModule} from '@nestjs/passport';
import Auth0Config from './auth0.config';
import {JwtStrategy} from './jwt.strategy';

@Module({
  imports: [ConfigModule.forFeature(Auth0Config), PassportModule],
  providers: [JwtStrategy],
})
export class AuthModule {}
