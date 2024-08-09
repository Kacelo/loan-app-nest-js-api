import { PrismaService } from 'src/prisma.service';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { Module } from '@nestjs/common';


@Module({
    controllers: [CompanyController],
    providers: [CompanyService, PrismaService],
  })
  export class CompanyModule {}