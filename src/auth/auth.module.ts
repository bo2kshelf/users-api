import {HttpModule, Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {PassportModule} from '@nestjs/passport';
import {UsersModule} from '../users/users.module';
import {AuthConfig} from './auth.config';

@Module({
  imports: [
    PassportModule,
    ConfigModule.forFeature(AuthConfig),
    HttpModule,
    UsersModule,
  ],
})
export class AuthModule {}
