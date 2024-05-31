import { Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { SearchService } from "./search.service";
import { SearchUsersDto } from "./dto/searchUsersDto";
import { Company, User as UserModel } from '@prisma/client';

@Controller("search")
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post("/user/:query")
  async search(@Param("query") query: string): Promise<UserModel[]> {
    return this.searchService.searchProfiles(query);
  }
  @Get("/company/:query")
  async searchCompany(@Param("query") query: string): Promise<Company[]> {
    return this.searchService.searchCompanies(query);
  }
}
