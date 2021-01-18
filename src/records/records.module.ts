import {Module} from '@nestjs/common';
import {PrismaModule} from '../prisma/prisma.module';
import {RecordsResolver} from './records.resolver';
import {RecordsService} from './records.service';

@Module({
  imports: [PrismaModule],
  providers: [RecordsResolver, RecordsService],
  exports: [RecordsService],
})
export class RecordsModule {}
