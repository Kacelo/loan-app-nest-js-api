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
  lenderId: string;

  @IsString()
  @IsNotEmpty()
  borrowerId: string;

  @IsString()
  @IsOptional()
  amount: GLfloat;

  @IsString()
  @IsOptional()
  interestRate: GLfloat;

  @IsDateString()
  @IsOptional()
  startDate: Date;

  @IsDateString()
  @IsOptional()
  endDate: Date;

  @IsString()
  @IsOptional()
  status: string;

  @IsString()
  @IsOptional()
  collateral?: string;

  @IsNumber()
  @IsOptional()
  latePaymentPenalty: number;

  @IsString()
  @IsOptional()
  comments?: string;

  @IsBoolean()
  @IsOptional()
  deleted?: boolean;
}
