import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../enums/role.enum";
import { ROLES_KEY } from "./roles.decorator";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      return true;
    }
    // const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
    //   context.getHandler(),
    //   context.getClass(),
    // ]);
    // if (!requiredRoles) {
    //   return true;
    // }
    // const { user } = context.switchToHttp().getRequest();
    // return requiredRoles.some((role) => user.roles?.includes(role));
    // const request = context.switchToHttp().getRequest();
    // const token = request.headers.authorization?.split(" ")[1];
    // if (!token) {
    //   throw new ForbiddenException("Access denied");
    // }

    // const decodedToken = this.jwtService.verify(token);
    // const userId = decodedToken.sub;

    // const userRoles = await this.prisma.mappedUserRoles.findMany({
    //   where: { userId },
    //   include: { role: true },
    // });

    // const userHasRole = userRoles.some((userRole) =>
    //   roles.includes(userRole.role.name)
    // );
    // if (!userHasRole) {
    //   throw new ForbiddenException("Access denied");
    // }

    return true;
  }
}
