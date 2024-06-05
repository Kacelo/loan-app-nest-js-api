import { Injectable } from '@nestjs/common';
import { MappedUserRoles, UserRole } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserRoleMapDto } from './dto/create-user-role-map-dto';

@Injectable()
export class MappedUserRoleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserRoleMapDto: CreateUserRoleMapDto): Promise<MappedUserRoles> {
    return this.prisma.mappedUserRoles.create({
      data: createUserRoleMapDto,
    });
  }
}
