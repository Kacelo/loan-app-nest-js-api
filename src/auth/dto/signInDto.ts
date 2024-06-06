import { IsOptional, IsString } from "class-validator";
import { Dto } from "src/lib/dto/dto";

export class SignInDto extends Dto<SignInDto> {
  @IsString()
  @IsOptional()
  username?: string;
  @IsString()
  @IsOptional()
  password?: string;
}

