import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

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
}
