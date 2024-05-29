import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { response } from 'express';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('users')
export default class usersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(@Res() response) {
    try {
      const userData = await this.usersService.getAllUsers();
      return response.status(HttpStatus.OK).json({
        message: 'All users data found successfully',
        userData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/:id')
  async getUsersById(@Res() response, @Param('id') id: string) {
    try {
      const existingUser = await this.usersService.getUserById(id);
      return response.status(HttpStatus.OK).json({
        message: 'User found successfully',
        existingUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Post()
  async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.usersService.createUser(createUserDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been created successfully',
        newUser,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCoe: 400,
        message: 'Error: Student not created!',
        error: 'Bad Request',
      });
    }
  }
  @Put('/:id')
  async replaceUser(
    @Res() response,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const existingUser = await this.usersService.updateUser(
        id,
        updateUserDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'user has been successfully updated',
        existingUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete(':id')
  async deleteUser(@Res() response, @Param('id') id: string) {
    try {
      const deletedUser = await this.usersService.deleteUser(id);
      return response.status(HttpStatus.OK).json({
        message: 'User deleted successfully',
        deletedUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
