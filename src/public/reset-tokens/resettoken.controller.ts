import {
  Body,
  Controller,
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
    const { email, username } = createResetTokenDto;
    if (!email && !username) {
      throw new NotFoundException("Email pr username must be provided");
    }
    const result = await this.resetTokensService.createResetToken({
      email,
      username,
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
  @Post("reset-password")
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPassworddto: ResetPasswordDto) {
    const { token, newPassword } = resetPassworddto;

    const decoded = await this.resetTokensService.validateResetToken(token);
    const userId = decoded.user.id;
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
