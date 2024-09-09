import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ResetTokensController } from './resettoken.controller';
import { ResetTokensService } from './resettoken.service';


@Module({
  imports: [],
  controllers: [ResetTokensController],
  providers: [ResetTokensService, PrismaService],
  exports: [ResetTokensService],

})
export class PasswordResetModule {}
