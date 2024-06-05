import { Injectable } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserRoleDto } from './dto/create-role-dto';

@Injectable()
export class UserRolesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserRoleDto: CreateUserRoleDto): Promise<UserRole> {
    return this.prisma.userRole.create({
      data: createUserRoleDto,
    });
  }
}
