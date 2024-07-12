import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';


@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService, PrismaService],
})
export class DocumentsModule {}