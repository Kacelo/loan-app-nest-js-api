// company.controller.ts
import { Controller, Post, Body, Get, Param, Patch } from "@nestjs/common";
import { CompanyService } from "./company.service";
import { Company } from "@prisma/client";
import { CreateCompanyDto } from "./dto/createCompanyDto";
import { UpdateCompanyDto } from "./dto/updateCompanyDto";
import { Public } from "src/auth/constants";
import { ApiTags } from "@nestjs/swagger";

@Controller("companies")
@ApiTags("companies")
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @Public()
  @Post()
  async createCompany(
    @Body()
    companyData: {
      email: string;
      name: string;
      address: string;
      city: string;
      region: string;
      registrationNumber: string;
      phoneNumber: string;
      postalCode: string;
    }
  ): Promise<Company> {
    const newCompany = await this.companyService.createCompany(companyData);
    console.log(newCompany);
    return newCompany;
  }
  @Public()
  @Post("/find")
  async findCompany(
    @Body() data: {  email: string; }
  ): Promise<Company> {
    const newCompany = await this.companyService.getCompanyByEmail(data.email);
    console.log(newCompany);
    return newCompany;
  }
 
  @Get(":id")
  async getCompany(@Param("id") id: string): Promise<Company> {
    return this.companyService.getCompany(id);
  }
  @Public()
  @Get()
  async getAllCompanies(): Promise<Company[]> {
    return this.companyService.getAllCompanies();
  }

  @Patch(":id")
  async updateCompany(
    @Param("id") id: string,
    @Body() updateCompanyDto: UpdateCompanyDto
  ): Promise<Company> {
    return this.companyService.updateCompany(id, updateCompanyDto);
  }
  @Public()
  @Get("route/:name")
  async getCompanyByName(@Param("name") name: string) {
    const company = await this.companyService.getCompanyByName(name);
    return company;
  }
}
