// loan.controller.ts
import { Body, Controller, Param, Patch, Post, Res, HttpStatus, Get } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/createLoanDto';
import { UpdateLoanDto } from './dto/updateLoanDto';
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;


@Controller('loans')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post('create')
  async createLoan(@Res() response, @Body() createLoanDto: CreateLoanDto) {
    try {
      const newLoan = await this.loanService.createLoan(createLoanDto);
      return response.status(HttpStatus.CREATED).json(newLoan);
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Loan not created!',
        error: err.message,
      });
    }
  }

  @Patch('update/:id')
  async updateLoan(@Res() response, @Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto) {
    try {
      const updatedLoan = await this.loanService.updateLoan(id, updateLoanDto);
      return response.status(HttpStatus.OK).json(updatedLoan);
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Loan not updated!',
        error: err.message,
      });
    }
  }
  @Patch('delete/:id')
  async deleteLoan(@Res() response, @Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto) {
    try {
        const convertedId = updateLoanDto.deleted
        const updatedLoan = await this.loanService.deleteLoan(id, convertedId);
        return response.status(HttpStatus.OK).json(updatedLoan);
      } catch (err) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          message: 'Error: Loan not updated!',
          error: err.message,
        });
      }
  }
  @Get()
  async getLoans(@Res() response) {
    try {
      const loanData = await this.loanService.getAllLoans();
      return response.status(HttpStatus.OK).json({
        message: 'All loan data found successfullyy',
        loanData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
