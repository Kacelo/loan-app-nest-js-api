import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateResetTokenDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly email: string;
}
