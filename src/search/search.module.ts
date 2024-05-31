import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { PrismaService } from 'src/prisma.service';
import { SearchController } from './search.controller';

@Module({
  controllers: [SearchController],
  exports: [SearchService],
  providers: [SearchService, PrismaService],
})
export class SearchModule {}