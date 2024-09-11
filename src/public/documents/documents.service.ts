import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateDocumentDto } from "./dto/createDocumentDto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class DocumentsService {
  constructor(private readonly prisma: PrismaService) {}

  async createDocument(createDocumentDto: any) {
    return this.prisma.document.create({
      data: createDocumentDto,
    });
  }
  async findAllDocuments() {
    return await this.prisma.document.findMany();
  }

  async findOneDocumentById(id: string) {
    const document = await this.prisma.document.findUnique({
      where: { id },
    });
    if (!document) {
      throw new NotFoundException(`document with ID ${id} not found`);
    }
    return document;
  }

  // async getDocumentsByLoanId(loanId: string) {
  //   return this.prisma.document.findMany({
  //     where: { loanId },
  //   });
  // }
}
