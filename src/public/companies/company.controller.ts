import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Company } from "@prisma/client";
import { CompanyService } from "./company.service";
import { Public } from "src/auth/constants";

@Controller("company")
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
      regitstrationNumber: string;
      phoneNumber: string;
      postalCode: string;
    }
  ): Promise<Company> {
    const newCompany = await this.companyService.createCompany(companyData);
    console.log(newCompany);
    return newCompany;
  }
}
