// update-loan.dto.ts
import { IsString, IsOptional, IsNumber, IsDateString, IsBoolean } from 'class-validator';

export class UpdateLoanDto {
  @IsString()
  @IsOptional()
  loanerId?: string;

  @IsString()
  @IsOptional()
  loaneeId?: string;

  @IsString()
  @IsOptional()
  amount?: string;

  @IsString()
  @IsOptional()
  interestRate?: string;

  @IsNumber()
  @IsOptional()
  duration?: number;

  @IsDateString()
  @IsOptional()
  startDate?: Date;

  @IsDateString()
  @IsOptional()
  endDate?: Date;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  collateral?: string;

  @IsString()
  @IsOptional()
  repaymentSchedule?: string;

  @IsNumber()
  @IsOptional()
  latePaymentPenalty?: number;

  @IsString()
  @IsOptional()
  comments?: string;

  @IsBoolean()
  @IsOptional()
  deleted?: boolean;
}
