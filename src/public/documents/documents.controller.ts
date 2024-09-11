import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
} from "@nestjs/common";
import { DocumentsService } from "./documents.service";
import { CreateDocumentDto } from "./dto/createDocumentDto";
import { Public } from "src/auth/constants";
import { ApiTags } from "@nestjs/swagger";

@Controller("documents")
@ApiTags("documents")
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}
  @Public()
  @Post()
  async createDocument(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentsService.createDocument(createDocumentDto);
  }
  @Public()
  // @Get("loan/:loanId")
  // async getDocumentsByLoanId(@Param("loanId") loanId: string) {
  //   const documents = await this.documentsService.getDocumentsByLoanId(loanId);
  //   if (!documents || documents.length === 0) {
  //     throw new NotFoundException("No documents found for this loan");
  //   }
  //   return documents;
  // }
  @Public()
  @Get()
  findAll() {
    return this.documentsService.findAllDocuments();
  }
  @Public()
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.documentsService.findOneDocumentById(id);
  }
}
