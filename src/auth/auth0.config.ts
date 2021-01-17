import {registerAs} from '@nestjs/config';

export default registerAs('auth0', () => ({
  issuer: process.env.AUTH0_ISSUER!,
  audience: process.env.AUTH0_AUDIENCE!,
}));
