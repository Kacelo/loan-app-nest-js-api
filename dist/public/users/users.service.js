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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
const authUser_dto_1 = require("./dto/authUser.dto");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createUser(data) {
        console.log('using prisma');
        const existingUser = await this.prisma.user.findFirst({
            where: {
                email: data.email,
            },
            select: {
                id: true,
            },
        });
        if (existingUser) {
            throw new common_1.ConflictException('User already exists');
        }
        return await this.prisma.user.create({
            data,
        });
    }
    async updateUser(id, updateUserDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!existingUser) {
            throw new common_1.NotFoundException('User not found');
        }
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        });
        console.log('updated user:', updatedUser);
        if (!updatedUser) {
            throw new common_1.NotFoundException('User not found');
        }
        return updatedUser;
    }
    async getUserById(userId) {
        if (!userId) {
            throw new common_1.NotFoundException('User not found');
        }
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return new authUser_dto_1.AuthUserDto({
            username: user.username,
            email: user.email,
            id: user.id,
        });
    }
    async getAllUsers() {
        const user = await this.prisma.user.findMany();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async deleteUser(id) {
        return this.prisma.user.delete({
            where: {
                id: id,
            },
        });
    }
    async createCompany(userId, createCompanyDto) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const company = await this.prisma.company.create({
            data: createCompanyDto,
        });
        await this.prisma.user.update({
            where: { id: userId },
            data: { companyId: company.id },
        });
        return company;
    }
    async updateCompany(companyId, updateCompanyDto) {
        const company = await this.prisma.company.findUnique({
            where: { id: companyId },
        });
        if (!company) {
            throw new common_1.NotFoundException('Company not found');
        }
        return await this.prisma.company.update({
            where: { id: companyId },
            data: updateCompanyDto,
        });
    }
    async deleteCompany(id, deleted) {
        const existingCompany = await this.prisma.company.findUnique({
            where: { id },
        });
        if (!existingCompany) {
            throw new common_1.NotFoundException('Loan not found');
        }
        return await this.prisma.company.update({
            where: { id },
            data: { deleted },
        });
    }
    async getAllLoans() {
        const companies = await this.prisma.loan.findMany({
            where: {
                deleted: false,
            },
        });
        if (!companies) {
            throw new common_1.NotFoundException('User not found');
        }
        return companies;
    }
    async searchCompany(name) {
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=users.service.js.map