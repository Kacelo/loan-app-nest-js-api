import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { LoanService } from './application.service';
import { CreateLoanDto } from './dto/create-application-dto';
import { UpdateLoanDto } from './dto/update-application-dto';
import { response } from 'express';

@Controller('loans')
export default class loanController {
  constructor(private readonly loanService: LoanService) {}
  @Get()
  async getAllLoans(@Res() response) {
    try {
      const allLoans = await this.loanService.getAllLoans();
      return response.status(HttpStatus.OK).json({
        message: 'All applications data found successfully',
        allLoans,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }
  // @Get()
  // async getApplicationsById(@Res() response, @Param('id') id: string) {
  //   try {
  //     const existingApplication =
  //       await this.applicationService.getLoanByLoanee(id);
  //     return response.status(HttpStatus.OK).json({
  //       message: 'Application found successfully',
  //       existingApplication,
  //     });
  //   } catch (error) {
  //     return response.status(error.status).json(error.response);
  //   }
  // }
  @Post()
  async createLoan(@Res() response, @Body() createLoanDto: CreateLoanDto) {
    try {
      const newLoan =
        await this.loanService.createLoan(createLoanDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Application has been created successfully',
        newLoan,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCoe: 400,
        message: 'Error: Student not created!',
        error: 'Bad Request',
      });
    }
  }
  @Put('/:id')
  async replaceLoan(
    @Res() response,
    @Param('id') id: string,
    @Body() updateLoanDto: UpdateLoanDto,
  ) {
    try {
      const existingLoan = await this.loanService.updateLoans(
        id,
        updateLoanDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Application has been successfully updated',
        existingLoan,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCoe: 400,
        message: 'Error: Application not updated!',
        error: 'Bad Request',
      });
    }
  }
  @Delete(':id')
  async deleteLoan(@Res() response, @Param('id') id: string) {
    try {
      const deletedApplication = await this.loanService.deleteLoans(id);
      return response.status(HttpStatus.OK).json({
        message: 'Application has been deleted successfully',
        deletedApplication,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCoe: 400,
        message: 'Error: Application not deleted!',
        error: 'Bad Request',
      });
    }
  }
}
