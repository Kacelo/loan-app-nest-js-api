// import { Injectable, NotFoundException } from "@nestjs/common";
// import { PrismaService } from "src/prisma.service";

// @Injectable()
// export class RolesService {
//   constructor(private readonly prisma: PrismaService) {}

//   async assignRoleToUser(userId: string, roleId: string) {
//     const user = await this.prisma.user.findUnique({ where: { id: userId } });
//     if (!user) {
//       throw new NotFoundException("user not found");
//     }

//     const role = await this.prisma.userRole.findUnique({
//       where: { id: roleId },
//     });
//     if (!role) {
//       throw new NotFoundException("Role not found");
//     }

//     return this.prisma.mappedUserRoles.create({
//       data: {
//         userId,
//         roleId,
//       },
//     });
//   }
// }
