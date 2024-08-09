import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  readonly token: string;
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly newPassword: string;
}