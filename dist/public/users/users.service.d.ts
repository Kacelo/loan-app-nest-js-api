import { PrismaService } from "src/prisma.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { User } from "@prisma/client";
import { AuthUserDto } from "./dto/authUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { CreateCompanyDto } from "../companies/dto/createCompanyDto";
import { UpdateCompanyDto } from "../companies/dto/updateCompanyDto";
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    getUserById(userId: string): Promise<AuthUserDto>;
    findOne(username: string): Promise<AuthUserDto>;
    getAllUsers(): Promise<{
        id: string;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
    }[]>;
    deleteUser(id: string): Promise<User>;
    updateAll(): Promise<void>;
    fetchUsersWithNullCreatedAt(): Promise<{
        id: string;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
    }[]>;
    updateUsersWithNullCreatedAt(): Promise<void>;
    createCompany(userId: string, createCompanyDto: CreateCompanyDto): Promise<{
        id: string;
        name: string;
        address: string;
        city: string;
        region: string;
        registrationNumber: string;
        phoneNumber: string;
        email: string;
        postalCode: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateCompany(companyId: string, updateCompanyDto: UpdateCompanyDto): Promise<{
        id: string;
        name: string;
        address: string;
        city: string;
        region: string;
        registrationNumber: string;
        phoneNumber: string;
        email: string;
        postalCode: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllLoans(): Promise<{
        id: string;
        lenderId: string;
        borrowerId: string;
        amount: number;
        interestRate: number;
        startDate: Date;
        endDate: Date;
        status: string;
        totalRepayment: number;
        comments: string;
        createdAt: Date;
        updatedAt: Date;
        deleted: boolean;
    }[]>;
    searchCompany(name: string): Promise<void>;
}
