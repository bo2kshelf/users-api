import {Inject, Injectable} from '@nestjs/common';
import {ConfigType} from '@nestjs/config';
import {PassportStrategy} from '@nestjs/passport';
import {passportJwtSecret} from 'jwks-rsa';
import {ExtractJwt, Strategy} from 'passport-jwt';
import authConfig from './auth.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(authConfig.KEY)
    private config: ConfigType<typeof authConfig>,
  ) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${config.auth0.issuer}/.well-known/jwks.json`,
      }),
      audience: config.auth0.audience,
      issuer: `${config.auth0.issuer}/`,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  validate(payload: unknown): unknown {
    return payload;
  }
}
