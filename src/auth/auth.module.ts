import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {PassportModule} from '@nestjs/passport';
import authConfig from './auth.config';
import {JwtStrategy} from './jwt.strategy';

@Module({
  imports: [ConfigModule.forFeature(authConfig), PassportModule],
  providers: [JwtStrategy],
})
export class AuthModule {}
