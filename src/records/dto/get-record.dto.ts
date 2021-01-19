import {ArgsType, Field, ID} from '@nestjs/graphql';
import {IsNumberString} from 'class-validator';

@ArgsType()
export class GetRecordArgs {
  @Field(() => ID)
  @IsNumberString({
    no_symbols: true, // eslint-disable-line @typescript-eslint/naming-convention
  })
  id!: string;
}
