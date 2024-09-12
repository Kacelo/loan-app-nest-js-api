import { CreateCompanyDto } from "./dto/createCompanyDto";
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Company, Lender } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { UpdateCompanyDto } from "./dto/updateCompanyDto";

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}
  async createCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const {
      email,
      name,
      address,
      city,
      region,
      registrationNumber,
      phoneNumber,
      postalCode,
    } = createCompanyDto;
  
    try {
      // Check if company name already exists
      const existingCompanyName = await this.prisma.company.findFirst({
        where: { name },
        select: { id: true },
      });
  
      // Check if company email already exists
      const existingCompanyEmail = await this.prisma.company.findFirst({
        where: { email },
        select: { id: true },
      });
  
      // If either name or email already exists, throw ConflictException
      if (existingCompanyName || existingCompanyEmail) {
        throw new ConflictException(
          `Company with the same ${existingCompanyName ? 'name' : 'email'} already exists`
        );
      }
  
      // Create the new company
      const newCompany = await this.prisma.company.create({
        data: {
          name,
          email,
          address,
          city,
          region,
          phoneNumber,
          postalCode,
          registrationNumber,
        },
      });
  
      return newCompany;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      } else {
        console.error('Error creating company:', error);
        throw new InternalServerErrorException('Failed to create company. Please try again.');
      }
    }
  }

  async assignUserToCompany(
    userId: string,
    companyId: string
  ): Promise<Lender> {
    try {
      const existingLender = await this.prisma.lender.findFirst({
        where: { userId },
      });

      if (existingLender) {
        throw new ConflictException(
          "User is already associated with a company"
        );
      }

      const lender = await this.prisma.lender.create({
        data: {
          userId,
          companyId,
        },
      });

      return lender;
    } catch (error) {
      console.log("Assigning user to company failed", error);
      throw error;
    }
  }
  async getCompanyByEmail(email: string) {
    console.log(email)
    if (!email) {
      throw new NotFoundException("User not found");
    }
    const company = await this.prisma.company.findFirst({
      where: {
        email: email,
      },
    });
    if (!company) {
      throw new NotFoundException("User not found");
    }
    return company;
  }
  async updateCompany(
    id: string,
    updateCompanyDto: UpdateCompanyDto
  ): Promise<Company> {
    const existingCompany = await this.prisma.company.findUnique({
      where: { id },
    });
    if (!existingCompany) {
      throw new NotFoundException("Company not found");
    }
    return this.prisma.company.update({
      where: { id },
      data: updateCompanyDto,
    });
  }

  async getCompany(id: string): Promise<Company> {
    const company = await this.prisma.company.findUnique({ where: { id } });
    if (!company) {
      throw new NotFoundException("Company not found");
    }
    return company;
  }
  async getCompanyByName(name: string): Promise<Company> {
    const company = await this.prisma.company.findFirst({
      where: { name },
    });
    if (!company) {
      throw new NotFoundException("Company not found");
    }
    return company;
  }

  async getAllCompanies(): Promise<Company[]> {
    return this.prisma.company.findMany();
  }
}
