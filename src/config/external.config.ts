import {registerAs} from '@nestjs/config';

export default registerAs('external', () => ({
  booksApiEndpoint: process.env.BOOKS_API_ENDPOINT!,
}));
