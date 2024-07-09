import { Model } from 'mongoose';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Loan } from './application.schema';
import { CreateLoanDto } from './dto/create-application-dto';
import { UpdateLoanDto } from './dto/update-application-dto';
import { ILoan } from './application.interface';

@Injectable()
export class LoanService {
  constructor(@InjectModel(Loan.name) private loanModel: Model<ILoan>) {}

  async createLoan(createLoanDto: CreateLoanDto): Promise<ILoan> {
    const createdLoan = new this.loanModel(createLoanDto);

    return createdLoan.save();
  }

  async getAllLoans(): Promise<ILoan[]> {
    const allLoans = await this.loanModel.find().exec();
    if (!allLoans || allLoans.length == 0) {
      throw new HttpException('Loans not found', HttpStatus.NOT_FOUND);
    }
    return allLoans;
  }
  async getLoanById(id: string): Promise<ILoan> {
    const loan = await this.loanModel.findById(id).exec();
    if (loan) {
      return loan;
    }
    throw new HttpException('Loan not found', HttpStatus.NOT_FOUND);
  }
  async updateLoans(id: string, updateLoanDto: UpdateLoanDto): Promise<ILoan> {
    const loanData = await this.loanModel.findByIdAndUpdate(id, updateLoanDto, {
      new: true,
    });
    if (!loanData) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return loanData;
  }
  async deleteLoans(id: string): Promise<ILoan> {
    const deletedLoan = await this.loanModel.findByIdAndDelete(id);
    if (!deletedLoan) {
      throw new HttpException('Loan not found', HttpStatus.NOT_FOUND);
    }
    return deletedLoan;
  }
}
