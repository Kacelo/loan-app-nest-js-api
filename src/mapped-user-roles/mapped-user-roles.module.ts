// loan.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MappedUserRoleController } from './mapped-user-role.controller';
import { MappedUserRoleService } from './mapped-user-role.service';

@Module({
  controllers: [MappedUserRoleController],
  providers: [MappedUserRoleService, PrismaService],
})
export class MappedUserRoleModule {}
