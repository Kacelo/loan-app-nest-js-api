// company.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { Company } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CreateCompanyDto } from "./dto/createCompanyDto";
import { UpdateCompanyDto } from "./dto/updateCompanyDto";

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async createCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
    return this.prisma.company.create({ data: createCompanyDto });
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
