// update-loan.dto.ts
import {
  IsString,
  IsOptional,
  IsNumber,
  IsDateString,
  IsBoolean,
} from "class-validator";

export class UpdateLoanDto {
  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  comments?: string;

  @IsBoolean()
  @IsOptional()
  deleted?: boolean;
}
