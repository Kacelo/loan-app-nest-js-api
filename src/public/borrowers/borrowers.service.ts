import { Borrower } from "@prisma/client";
import { CreateBorrowerDto } from "./dto/createBorrower.dto";
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
@Injectable()
export class BorrowersService {
  constructor(private prisma: PrismaService) {}

  async createBorrower(
    createBorrowerDto: CreateBorrowerDto
  ): Promise<Borrower> {
    const { userId } = createBorrowerDto;
    const borrowers = await this.prisma.borrower.create({
      data: {
        userId: userId,
        // Additional borrower-specific fields
      },
    });
    return borrowers;
  }
}
