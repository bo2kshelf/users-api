import {registerAs} from '@nestjs/config';

export default registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET!,
  auth0: {
    issuer: process.env.AUTH0_ISSUER!,
    audience: process.env.AUTH0_AUDIENCE!,
  },
}));
