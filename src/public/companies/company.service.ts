import { CreateCompanyDto } from "./dto/createCompanyDto";
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Company, Lender } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

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
      const existingCompanyName = await this.prisma.company.findFirst({
        where: {
          name: name,
        },
        select: {
          id: true,
        },
      });
      const existingCompanyEmail = await this.prisma.company.findFirst({
        where: {
          email: email,
        },
        select: {
          id: true,
        },
      });
      if (existingCompanyName || existingCompanyEmail) {
        throw new ConflictException("Company already exists");
      }
      const newCompany = await this.prisma.company.create({
        data: {
          name,
          email,
          address,
          city,
          region,
          phoneNumber,
          postalCode,
          registrationNumber
        },
      });
      return newCompany;
    } catch (error) {
      console.log("Error creating company", error);
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
}
