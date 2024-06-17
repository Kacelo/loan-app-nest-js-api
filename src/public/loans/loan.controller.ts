// loan.controller.ts
import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Res,
  HttpStatus,
  Get,
} from "@nestjs/common";
import { LoanService } from "./loan.service";
import { CreateLoanDto } from "./dto/createLoanDto";
import { UpdateLoanDto } from "./dto/updateLoanDto";
import mongoose from "mongoose";
import { Roles } from "../roles/roles.decorator";
import { Role } from "../enums/role.enum";
import { Public } from "src/auth/constants";
// import { Public } from "@prisma/client/runtime/library";
const { ObjectId } = mongoose.Types;

@Controller("loans")
export class LoanController {
  constructor(private readonly loanService: LoanService) {}
  @Public()
  @Post("create")
  @Roles(Role.Borrower)
  async createLoan(@Res() response, @Body() createLoanDto: CreateLoanDto) {
    try {
      const newLoan = await this.loanService.createLoan(createLoanDto);
      return response
        .status(HttpStatus.CREATED)
        .json({ newLoan, message: "Loan created successfully" });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: "Error: Loan not created!",
        error: err.message,
      });
    }
  }
  @Public()
  @Patch("update/:id")
  async updateLoan(
    @Res() response,
    @Param("id") id: string,
    @Body() updateLoanDto: UpdateLoanDto
  ) {
    try {
      const updatedLoan = await this.loanService.updateLoan(id, updateLoanDto);
      return response.status(HttpStatus.OK).json({
        message: 'Loan status updated successfully',
        updatedLoan,
      });    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: "Error: Loan not updated!",
        error: err.message,
      });
    }
  }
  @Patch("delete/:id")
  async deleteLoan(
    @Res() response,
    @Param("id") id: string,
    @Body() updateLoanDto: UpdateLoanDto
  ) {
    try {
      const convertedId = updateLoanDto.deleted;
      const updatedLoan = await this.loanService.deleteLoan(id);
      return response.status(HttpStatus.OK).json(updatedLoan);
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: "Error: Loan not updated!",
        error: err.message,
      });
    }
  }
  @Get()
  async getLoans(@Res() response) {
    try {
      const loanData = await this.loanService.getAllLoans();
      return response.status(HttpStatus.OK).json({
        message: "All loan data found successfullyy",
        loanData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get("applications/:lenderId")
  async getLoanApplications(
    @Res() response,
    @Param("lenderId") lenderId: string
  ) {
    try {
      const loanData = await this.loanService.findLenderApplications(lenderId);
      return response.status(HttpStatus.OK).json({
        message: "All loan data found successfullyy",
        loanData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
