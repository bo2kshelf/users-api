import {Resolver} from '@nestjs/graphql';
import {BookEntity} from './book.entity';

@Resolver(() => BookEntity)
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class BooksResolver {}
