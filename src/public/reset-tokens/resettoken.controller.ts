import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
} from "@nestjs/common";
import { Cron } from "@nestjs/schedule";

import { PrismaService } from "src/prisma.service";
import { ResetTokensService } from "./resettoken.service";
import { Public } from "src/auth/constants";
import { CreateResetTokenDto } from "./dto/create-reset-token.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller("auth")
@ApiTags('auth')
export class ResetTokensController {
  constructor(
    private readonly resetTokensService: ResetTokensService,
    private readonly prisma: PrismaService
  ) {}

  @Public()
  @Post("request-reset")
  @HttpCode(HttpStatus.OK)
  async requestReset(@Body() createResetTokenDto: CreateResetTokenDto) {
    const { email } = createResetTokenDto;
    if (!email) {
      throw new NotFoundException("Email pr username must be provided");
    }
    const result = await this.resetTokensService.createResetToken({
      email,
    });

    return {
      message: "If the account exists, a password reset email has been sent.",
      ...result,
    };
  }

  @Public()
  @Post("validate-reset-token")
  @HttpCode(HttpStatus.OK)
  async validateResetToken(@Body("token") token: string) {
    const result = await this.resetTokensService.validateResetToken(token);
    return result;
  }
  @Public()
  @Get('get-tokens')
  @HttpCode(HttpStatus.OK)
  async getTokens(){
    const tokens = await this.resetTokensService.getAllTokens();
    console.log(tokens)
    return tokens
  }

  @Public()
  @Post("reset-password")
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPassworddto: ResetPasswordDto) {
    const { token, newPassword } = resetPassworddto;

    const decoded = await this.resetTokensService.validateResetToken(token);
    console.log("decoded ",decoded)

    const userId = decoded.sub;
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: newPassword },
    });
    await this.resetTokensService.deleteResetToken(token);
    return { message: "Password has been reset successfully" };
  }
  @Cron('0 0 * * *') // Runs every day at midnight
  async cleanExpiredTokens() {
    const now = new Date();
    await this.prisma.resetTokens.deleteMany({
      where: {
        createdAt: {
          lt: new Date(now.getTime() - 30 * 60 * 1000), // 30 minutes
        },
      },
    });
  }
}
