import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Company, User } from "@prisma/client";
@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}
  async searchProfiles(query: string): Promise<User[]> {
    const profiles = await this.prisma.user.findMany({
      where: {
        OR: [
          { username: { contains: query } },
          { firstname: { contains: query } },
        ],
        AND: [
          {
            username: {
              not: null,
            },
          },
        ],
      },
    });
    if (!profiles) {
      throw new NotFoundException("User not found");
    }
    return profiles
  }
  async searchCompanies(query: string): Promise<Company[]>{
    console.log(query)

    const companyProfiles = await this.prisma.company.findMany({
        where: {
          OR: [
            { name: { contains: query } },
          ],
          AND: [
            {
                name: {
                not: null,
              },
            },
          ],
        },
      });
      if (companyProfiles.length === 0) {
        throw new NotFoundException('Company not found');
      }
      return companyProfiles
  }

}
