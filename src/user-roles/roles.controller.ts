import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common';
import { UserRolesService } from './roles.service';
import { CreateUserRoleDto } from './dto/create-role-dto';
import { Public } from 'src/auth/constants';

@Controller('user-roles')
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}
  @Public()
  @Post()
  async create(@Body() createUserRoleDto: CreateUserRoleDto, @Res() response) {
    try {
      const newUserRole = await this.userRolesService.create(createUserRoleDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'UserRole has been created successfully',
        newUserRole,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: UserRole not created!',
        error: err.message,
      });
    }
  }
}
