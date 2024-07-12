// repayment-schedule.service.ts
import { Injectable } from '@nestjs/common';
import { CreateRepaymentScheduleDto } from './dto/create-repayment-schedule.dto';
import { UpdateRepaymentScheduleDto } from './dto/update-repayment-schedule.dto';
import { RepaymentSchedule } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RepaymentScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  async createRepaymentSchedule(createRepaymentScheduleDto: CreateRepaymentScheduleDto): Promise<RepaymentSchedule> {
    const { loanId, paymentDate, amountDue } = createRepaymentScheduleDto;

    return await this.prisma.repaymentSchedule.create({
      data: {
        loanId,
        paymentDate,
        amountDue,
        status: 'PENDING',
      },
    });
  }

  async updateRepaymentSchedule(id: string, updateRepaymentScheduleDto: UpdateRepaymentScheduleDto): Promise<RepaymentSchedule> {
    return await this.prisma.repaymentSchedule.update({
      where: { id },
      data: updateRepaymentScheduleDto,
    });
  }

  async getRepaymentSchedulesByLoan(loanId: string): Promise<RepaymentSchedule[]> {
    return await this.prisma.repaymentSchedule.findMany({
      where: { loanId },
    });
  }
}
