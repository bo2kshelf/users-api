import {Field, ID, ObjectType} from '@nestjs/graphql';
import {IsNumberString} from 'class-validator';

@ObjectType('Record')
export class RecordEntity {
  @Field(() => ID)
  @IsNumberString()
  id!: number;

  @Field(() => Boolean)
  have!: boolean;

  @Field(() => Boolean)
  read!: boolean;

  @Field(() => Boolean)
  reading!: boolean;
}
