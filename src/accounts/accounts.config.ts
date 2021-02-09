import {registerAs} from '@nestjs/config';

export const AccountsConfig = registerAs('account', () => ({
  pictureProxyBaseUrl: process.env.IMAGEPROXY_BASE_URL,
}));
