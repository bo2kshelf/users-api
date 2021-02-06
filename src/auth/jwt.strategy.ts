import {Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import {ConfigType} from '@nestjs/config';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {UsersService} from '../users/users.service';
import {AuthConfig} from './auth.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AuthConfig.KEY)
    private readonly authConfig: ConfigType<typeof AuthConfig>,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig.jwt.secret,
    });
  }

  async validate({id}: {id: string}) {
    return this.usersService.getUser({id}).then((user) => {
      if (user) return {id: user.id};
      else throw new UnauthorizedException();
    });
  }
}
