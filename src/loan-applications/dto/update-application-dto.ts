import { PartialType } from '@nestjs/mapped-types';
import { CreateLoanDto } from './create-application-dto';
export class UpdateLoanDto extends PartialType(CreateLoanDto) {}
