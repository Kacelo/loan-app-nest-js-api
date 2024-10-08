import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  Put,
  Res,
  UseGuards,
} from "@nestjs/common";
import { User as UserModel } from "@prisma/client";
import { UsersService } from "./users.service";
import { encodePassword } from "src/utils/bcrypt";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UpdateCompanyDto } from "../companies/dto/updateCompanyDto";
import { CreateCompanyDto } from "../companies/dto/createCompanyDto";
import { Public } from "src/auth/constants";
import { Roles } from "../roles/roles.decorator";
import { ApiTags } from "@nestjs/swagger";

@Controller("user")
@ApiTags("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async signupUser(
    @Body() userData: { username: string; email: string; password: string, role: string, firstName: string, lastName:string }
  ): Promise<UserModel> {
    const password = encodePassword(userData.password);
    console.log("encoded password", password);
    return this.userService.createUser({ ...userData, password });
  }
  @Post("update/:id")
  async replaceUser(
    @Res() response,
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    try {
      const existingUser = await this.userService.updateUser(id, updateUserDto);
      return response.status(HttpStatus.OK).json({
        message: "user has been successfully updated",
        existingUser,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: "user has not been successfully updated",
      });
    }
  }
  @Public()
  @Get()
  async getAllUsers(@Res() response) {
    try {
      const userData = await this.userService.getAllUsers();
      console.log("user data: ", userData);
      return response.status(HttpStatus.OK).json({
        message: "All users data found successfullyy",
        userData,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: "No Users Found",
        error: err.message,
      });
    }
  }
  @Get("/:id")
  async getUsersById(@Res() response, @Param("id") id: string) {
    try {
      const existingUser = await this.userService.getUserById(id);
      return response.status(HttpStatus.OK).json({
        message: "User found successfully",
        existingUser,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: "User Not Found",
      });
    }
  }
  @Delete(":id")
  async deleteUser(@Res() response, @Param("id") id: string) {
    try {
      const deletedUser = await this.userService.deleteUser(id);
      return response.status(HttpStatus.OK).json({
        message: "User deleted successfully",
        deletedUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Patch("update/:id")
  async updateUser(
    @Res() response,
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    try {
      const updatedUser = await this.userService.updateUser(id, updateUserDto);
      return response.status(HttpStatus.OK).json(updatedUser);
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: "Error: User not updated!",
        error: err.message,
      });
    }
  }
  @Public()
  @Patch("update-all")
  async updateAllUser(@Res() response) {
    try {
      const updatedUser = await this.userService.fetchUsersWithNullCreatedAt();
      return response.status(HttpStatus.OK).json(updatedUser);
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: "Error: User not updated!",
        error: err.message,
      });
    }
  }
  @Public()
  @Post("create-company/:userId")
  async createCompany(
    @Res() response,
    @Param("userId") userId: string,
    @Body() createCompanyDto: CreateCompanyDto
  ) {
    try {
      const company = await this.userService.createCompany(
        userId,
        createCompanyDto
      );
      return response.status(HttpStatus.CREATED).json(company);
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: "Error: Company not created!",
        error: err.message,
      });
    }
  }
  @Patch("update-company/:companyId")
  async updateCompany(
    @Res() response,
    @Param("companyId") companyId: string,
    @Body() updateCompanyDto: UpdateCompanyDto
  ) {
    try {
      const company = await this.userService.updateCompany(
        companyId,
        updateCompanyDto
      );
      return response.status(HttpStatus.OK).json(company);
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: "Error: Company not updated!",
        error: err.message,
      });
    }
  }
  // @Public()
  // @Post(":id/assign-role")
  // // @Roles('ADMIN')
  // assignRole(@Param("id") userId: string, @Body("roleId") roleId: string) {
  //   return this.userService.assignRoleToUser(userId, roleId);
  // }
}
