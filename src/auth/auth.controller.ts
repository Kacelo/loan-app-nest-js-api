import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { Public } from "./constants";
import { SignInDto } from "./dto/signInDto";
import { CreateUserDto } from "src/public/users/dto/createUser.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post("login")
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
  @Public()
  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }
  @Public()
  @Post("signup")
  async signUp(@Body() createUserDto: CreateUserDto, @Res() response) {
    try {
      const token = await this.authService.signUp(createUserDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'User registered successfully',
        token,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'User registration failed',
        error: error.message,
      });
    }
  }
}
