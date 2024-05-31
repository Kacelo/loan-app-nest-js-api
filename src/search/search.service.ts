import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async searchProfiles(query: string): Promise<User[]> {
    const profiles = await this.prisma.user.findMany({
      where: {
        OR: [
          { username: { contains: query, mode: 'insensitive' } },
          { firstname: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
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

    if (profiles.length === 0) {
      throw new NotFoundException('User not found');
    }

    return profiles;
  }

  async searchCompany(query: string): Promise<any[]> {
    const companies = await this.prisma.company.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });

    if (companies.length === 0) {
      throw new NotFoundException('Company not found');
    }

    return companies;
  }
}
