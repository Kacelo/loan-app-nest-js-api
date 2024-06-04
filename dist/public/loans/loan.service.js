"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
let LoanService = class LoanService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createLoan(createLoanDto) {
        return await this.prisma.loan.create({
            data: createLoanDto,
        });
    }
    async updateLoan(id, updateLoanDto) {
        const existingLoan = await this.prisma.loan.findUnique({
            where: { id },
        });
        if (!existingLoan) {
            throw new common_1.NotFoundException('Loan not found');
        }
        return await this.prisma.loan.update({
            where: { id },
            data: updateLoanDto,
        });
    }
    async deleteLoan(id) {
        const existingLoan = await this.prisma.loan.findUnique({
            where: { id },
        });
        if (!existingLoan) {
            throw new common_1.NotFoundException('Loan not found');
        }
        return await this.prisma.loan.update({
            where: { id },
            data: { deleted: true },
        });
    }
    async getAllLoans() {
        const user = await this.prisma.loan.findMany({
            where: {
                deleted: false,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async findLenderApplications(lenderId) {
        const applications = await this.prisma.loan.findMany({
            where: {
                loanerId: lenderId
            },
        });
        if (applications.length === 0) {
            throw new common_1.NotFoundException('Company not found');
        }
        return applications;
    }
};
exports.LoanService = LoanService;
exports.LoanService = LoanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LoanService);
//# sourceMappingURL=loan.service.js.map