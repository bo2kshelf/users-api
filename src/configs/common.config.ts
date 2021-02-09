import {registerAs} from '@nestjs/config';

export const CommonConfig = registerAs('common', () => ({
  imageproxyBaseUrl: process.env.IMAGEPROXY_BASE_URL,
}));
