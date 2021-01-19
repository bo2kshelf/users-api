import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import ExternalConfig from '../config/external.config';
import {PrismaModule} from '../prisma/prisma.module';
import {RecordsResolver} from './records.resolver';
import {RecordsService} from './records.service';

@Module({
  imports: [PrismaModule, ConfigModule.forFeature(ExternalConfig)],
  providers: [RecordsResolver, RecordsService],
  exports: [RecordsService],
})
export class RecordsModule {}
