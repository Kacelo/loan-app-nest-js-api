import { User as UserModel } from "@prisma/client";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UpdateCompanyDto } from "../companies/dto/updateCompanyDto";
import { CreateCompanyDto } from "../companies/dto/createCompanyDto";
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    signupUser(userData: {
        username: string;
        email: string;
        password: string;
    }): Promise<UserModel>;
    replaceUser(response: any, id: string, updateUserDto: UpdateUserDto): Promise<any>;
    getAllUsers(response: any): Promise<any>;
    getUsersById(response: any, id: string): Promise<any>;
    deleteUser(response: any, id: string): Promise<any>;
    updateUser(response: any, id: string, updateUserDto: UpdateUserDto): Promise<any>;
    updateAllUser(response: any): Promise<any>;
    createCompany(response: any, userId: string, createCompanyDto: CreateCompanyDto): Promise<any>;
    updateCompany(response: any, companyId: string, updateCompanyDto: UpdateCompanyDto): Promise<any>;
    assignRole(userId: string, roleId: string): Promise<{
        id: string;
        userId: string;
        roleId: string;
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
    }>;
}
