import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RepaymentScheduleController } from './repayment-schedule.controller';
import { RepaymentScheduleService } from './repayment-schedule.service';

@Module({
  controllers: [RepaymentScheduleController],
  providers: [RepaymentScheduleService, PrismaService],
})
export class RepaymentScheduleModule {}