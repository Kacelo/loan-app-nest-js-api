import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common';
import { Public } from 'src/auth/constants';
import { CreateUserRoleMapDto } from './dto/create-user-role-map-dto';
import { MappedUserRoleService } from './mapped-user-role.service';

@Controller('mapped-user-roles')
export class MappedUserRoleController {
  constructor(private readonly mappedUserRoleService: MappedUserRoleService) {}
  @Public()
  @Post()
  async create(@Body() createUserRoleMapDto: CreateUserRoleMapDto, @Res() response) {
    try {
      const newUserRole = await this.mappedUserRoleService.create(createUserRoleMapDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'UserRole Map has been created successfully',
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
