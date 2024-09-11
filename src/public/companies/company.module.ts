import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';


@Module({
  controllers: [CompanyController],
  providers: [CompanyService, PrismaService],
})
export class CompanyModule {}
