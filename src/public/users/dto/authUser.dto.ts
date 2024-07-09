// import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/dto';

export class AuthUserDto extends Dto<AuthUserDto> {
  @IsString()
  id: string;

  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  username?: string;
  @IsString()
  @IsOptional()
  password?: string;
}