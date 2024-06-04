import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Public } from './constants';
import { SignInDto } from './dto/signInDto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInDto:SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
  @Public()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
