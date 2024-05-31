import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { User } from '@prisma/client';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('profiles')
  async searchProfiles(@Query('query') query: string): Promise<User[]> {
    return this.searchService.searchProfiles(query);
  }

  @Get('company')
  async searchCompany(@Query('query') query: string): Promise<any> {
    // Assuming you have a method in your SearchService to search companies
    return this.searchService.searchCompany(query);
  }
}
