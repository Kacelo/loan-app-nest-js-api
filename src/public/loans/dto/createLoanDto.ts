import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsDateString,
  IsBoolean,
} from "class-validator";

export class CreateLoanDto {
  @IsString()
  @IsNotEmpty()
  lenderId?: string;

  @IsString()
  @IsNotEmpty()
  borrowerId: string;

  @IsString()
  @IsOptional()
  amount?: string;

  @IsString()
  @IsOptional()
  interestRate?: string;

  @IsNumber()
  @IsOptional()
  duration?: number; // Duration in months

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
  @IsString()
  @IsOptional()
  repaymentScheduleId?: string;
}
