// create-repayment-schedule.dto.ts
import { IsString, IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class CreateRepaymentScheduleDto {
  @IsString()
  @IsNotEmpty()
  loanId: string;

  @IsDateString()
  @IsNotEmpty()
  paymentDate: Date;

  @IsNumber()
  @IsNotEmpty()
  amountDue: number;
}

