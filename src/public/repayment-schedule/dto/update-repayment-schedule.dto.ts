// update-repayment-schedule.dto.ts
import { IsString, IsOptional, IsDateString, IsNumber } from 'class-validator';

export class UpdateRepaymentScheduleDto {
  @IsDateString()
  @IsOptional()
  paymentDate?: Date;

  @IsNumber()
  @IsOptional()
  amountDue?: number;

  @IsNumber()
  @IsOptional()
  amountPaid?: number;

  @IsString()
  @IsOptional()
  status?: string;
}
