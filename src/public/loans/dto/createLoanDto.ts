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
  amount: number;

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

  @IsNumber()
  @IsOptional()
  totalRepayment?: number;

  @IsString()
  @IsOptional()
  comments?: string;

  @IsBoolean()
  @IsOptional()
  deleted?: boolean;
}
