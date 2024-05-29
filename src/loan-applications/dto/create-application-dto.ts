import { IsArray, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateLoanDto {
  @IsString()
  @IsNotEmpty()
  readonly loanee: string;
  @IsString()
  @IsNotEmpty()
  readonly loaner: string;
  @IsNotEmpty()
  readonly documents: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly loanAmount: string;
  readonly isApproved: boolean;
}
