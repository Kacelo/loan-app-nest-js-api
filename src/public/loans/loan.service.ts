// loan.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateLoanDto } from './dto/createLoanDto';
import { UpdateLoanDto } from './dto/updateLoanDto';

@Injectable()
export class LoanService {
  constructor(private prisma: PrismaService) {}

  async createLoan(createLoanDto: CreateLoanDto) {
    return await this.prisma.loan.create({
      data: createLoanDto,
    });
  }

  async updateLoan(id: string, updateLoanDto: UpdateLoanDto) {
    const existingLoan = await this.prisma.loan.findUnique({
      where: { id },
    });

    if (!existingLoan) {
      throw new NotFoundException('Loan not found');
    }

    return await this.prisma.loan.update({
      where: { id },
      data: updateLoanDto,
    });
  }
  async deleteLoan(id: string) {
    const existingLoan = await this.prisma.loan.findUnique({
      where: { id },
    });

    if (!existingLoan) {
      throw new NotFoundException('Loan not found');
    }

    return await this.prisma.loan.update({
      where: { id },
      data: { deleted: true },
    });
  }
  async getAllLoans() {
    const user = await this.prisma.loan.findMany({
      where: {
        deleted: false,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async findLenderApplications(lenderId: string): Promise<any[]> {
    const applications = await this.prisma.loan.findMany({
      where: {
        lenderId: lenderId
      },
    });

    if (applications.length === 0) {
      throw new NotFoundException('Company not found');
    }

    return applications;
  }
}
