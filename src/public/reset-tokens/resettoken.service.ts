import jwt from "jsonwebtoken";
import {sign, verify, JwtPayload} from "jsonwebtoken";
import * as nodemailer from "nodemailer";
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { User } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { Cron } from "@nestjs/schedule";
export interface IResetTokenReturn {
  resetToken: string;
  error: boolean;
}

export interface IDecodedReset {
  user: { id: string };
  iat: number;
  exp: number;
}
@Injectable()
export class ResetTokensService {
  private transporter;

  constructor(private prisma: PrismaService,  private jwtService: JwtService,) {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT, 10),
      secure: process.env.EMAIL_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  generateJWTToken(user: User): Promise<string> {
    return new Promise((resolve, reject) => {
      const payload = { user: { id: user.id } };
      sign(payload, process.env.JWT_SECRET, { expiresIn: "30m" }, (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  }

  async sendResetEmail(email: string, resetToken: string) {
    const resetLink = `http://yourapp.com/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Password Reset",
      html: `<p>You requested a password reset. Click the link below to reset your password:</p>
      <p><a href="${resetLink}">Reset Password</a></p>`,
    };
    await this.transporter.sendMail(mailOptions);
  }

  async createResetToken({
    email,
    username,
  }: {
    email?: string;
    username?: string;
  }): Promise<IResetTokenReturn> {
    let user: User | null;
    if (email) {
      user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });
    } else if (username) {
      user = await this.prisma.user.findUnique({
        where: {
          username: username,
        },
      });
    }
    if (!user) {
      if (!user) {
        throw new NotFoundException("User not found");
      }
    }

    let existingResetToken = await this.prisma.resetTokens.findMany({
      where: {
        userId: user.id,
      },
    });

    if (existingResetToken.length > 0) {
      throw new ConflictException("Reset token already exists for this user");
    }
    const resetToken = await this.generateJWTToken(user);

    const newResetToken = await this.prisma.resetTokens.create({
      data: {
        resetToken: resetToken,
        userId: user.id,
      },
    });
    // Send reset email
    await this.sendResetEmail(user.email, resetToken);

    return {
      resetToken: newResetToken.resetToken,
      error: false,
    };
  }
  async validateResetToken(resetToken: string): Promise<IDecodedReset> {
    try {
      const decoded = verify(
        resetToken,
        process.env.JWT_SECRET
      ) as IDecodedReset;
      return decoded;
    } catch (error) {
      throw new ConflictException("Invalid or expired reset token");
    }
  }
  async deleteResetToken(resetToken: string): Promise<void> {
    await this.prisma.resetTokens.deleteMany({
      where: {
        resetToken: resetToken,
      },
    });
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
