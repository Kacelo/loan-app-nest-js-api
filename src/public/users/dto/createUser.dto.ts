import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly username: string;
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
  @IsString()
  @IsOptional()
  role: string; // Can extend this for more roles
  @IsString()
  @IsOptional()
  companyId?: string; // Optional, only required if role is Lender
  // Add other necess}
}
