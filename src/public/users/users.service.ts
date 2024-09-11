import { UpdateLoanDto } from "./../../loan-applications/dto/update-application-dto";
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { encodePassword } from "src/utils/bcrypt";
import { User } from "@prisma/client";
import { AuthUserDto } from "./dto/authUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { CreateCompanyDto } from "../companies/dto/createCompanyDto";
import { UpdateCompanyDto } from "../companies/dto/updateCompanyDto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, username, password, role } = createUserDto;

    try {
      console.log("using prisma");
      const hashedPassword = encodePassword(password);
      const existingUser = await this.prisma.user.findFirst({
        where: {
          email: email,
          username: username,
        },
        select: {
          id: true,
        },
      });

      if (existingUser) {
        throw new ConflictException("User already exists");
      }
      // Step 2: Create the user
      const user = await this.prisma.user.create({
        data: {
          email,
          username,
          role,
          password: hashedPassword, // Only set companyId if the role is Lender
          // Add other necessary fields
        },
      });
      if (role === "Borrower") {
        const borrowers = await this.prisma.borrower.create({
          data: {
            userId: user.id,
          },
        });
        // return borrowers
      } else if (role === "Lender") {
        await this.prisma.lender.create({
          data: {
            userId: user.id,
            companyId: user.companyId,
            // Additional lender-specific fields
          },
        });
      }
      return user;
    } catch (error) {
      console.log("user create failed", error);
    }
  }
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!existingUser) {
      throw new NotFoundException("User not found");
    }
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    console.log("updated user:", updatedUser);

    if (!updatedUser) {
      throw new NotFoundException("User not found");
    }
    return updatedUser;
  }
  async getUserById(userId: string) {
    if (!userId) {
      throw new NotFoundException("User not found");
    }
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return new AuthUserDto({
      username: user.username,
      email: user.email,
      id: user.id,
    });
  }
  async findOne(username: string) {
    if (!username) {
      throw new NotFoundException("User not found");
    }
    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return new AuthUserDto({
      username: user.username,
      email: user.email,
      id: user.id,
      password: user.password,
    });
  }

  async getAllUsers() {
    const user = await this.prisma.user.findMany();
    console.log("user:", user);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }
  async deleteUser(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
  async updateAll() {
    const user = await this.prisma.user.updateMany({
      where: { createdAt: null },
      data: { createdAt: new Date() },
    });
  }

  async fetchUsersWithNullCreatedAt() {
    const users = await this.prisma.user.findMany({
      where: {
        createdAt: null,
      },
    });
    return users;
  }
  async updateUsersWithNullCreatedAt() {
    const users = await this.fetchUsersWithNullCreatedAt();

    for (const user of users) {
      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          createdAt: new Date(),
        },
      });
    }
    console.log("All users with null createdAt have been updated.");
  }
  async createCompany(userId: string, createCompanyDto: CreateCompanyDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    try {
      // Check if the user is already associated with a company
      const existingLender = await this.prisma.lender.findFirst({
        where: { userId },
      });
      if (existingLender && existingLender.companyId) {
        throw new ConflictException("Lender is already associated with a company");
      }
      const company = await this.prisma.company.create({
        data: createCompanyDto,
      });
      await this.prisma.user.update({
        where: { id: userId },
        data: { companyId: company.id },
      });
  
      return company;
    } catch (error) {
      console.log("Company creation failed", error);
      throw error;
    }
    

   
  }
  async updateCompany(companyId: string, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
    });
    if (!company) {
      throw new NotFoundException("Company not found");
    }

    return await this.prisma.company.update({
      where: { id: companyId },
      data: updateCompanyDto,
    });
  }
  // async deleteCompany(id: string, deleted: boolean) {
  //   const existingCompany = await this.prisma.company.findUnique({
  //     where: { id },
  //   });

  //   if (!existingCompany) {
  //     throw new NotFoundException("Loan not found");
  //   }

  //   return await this.prisma.company.update({
  //     where: { id },
  //     data: { deleted },
  //   });
  // }
  async getAllLoans() {
    const companies = await this.prisma.loan.findMany({
      where: {
        deleted: false,
      },
    });
    if (!companies) {
      throw new NotFoundException("User not found");
    }
    return companies;
  }
  async searchCompany(name: string) {}
  // async assignRoleToUser(userId: string, roleId: string) {
  //   const user = await this.prisma.user.findUnique({ where: { id: userId } });
  //   if (!user) {
  //     throw new NotFoundException("user not found");
  //   }

  //   const role = await this.prisma.userRole.findUnique({
  //     where: { id: roleId },
  //   });
  //   if (!role) {
  //     throw new NotFoundException("Role not found");
  //   }

  //   return this.prisma.mappedUserRoles.create({
  //     data: {
  //       userId,
  //       roleId,
  //     },
  //   });
  // }
}
