import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRole } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CreateUserRoleDto } from "./dto/create-role-dto";

@Injectable()
export class UserRolesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserRoleDto: any): Promise<UserRole> {
    return this.prisma.userRole.create({
      data: createUserRoleDto,
    });
  }
  async getAllUserRoles() {
    const roles = await this.prisma.userRole.findMany();
    if (!roles) {
      throw new NotFoundException("Roles not found");
    }
    return roles;
  }
  async getUserRoleById(roleId: string) {
    if (!roleId) {
      throw new NotFoundException("User not found");
    }
    const role = await this.prisma.userRole.findUnique({
      where: {
        id: roleId,
      },
    });
    if (!role) {
      throw new NotFoundException("User not found");
    }
    return role;
  }
  async deleteRole(id: string): Promise<UserRole> {
    return this.prisma.userRole.delete({
      where: {
        id: id,
      },
    });
  }
}
