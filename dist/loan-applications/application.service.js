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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const application_schema_1 = require("./application.schema");
let LoanService = class LoanService {
    constructor(loanModel) {
        this.loanModel = loanModel;
    }
    async createLoan(createLoanDto) {
        const createdLoan = new this.loanModel(createLoanDto);
        return createdLoan.save();
    }
    async getAllLoans() {
        const allLoans = await this.loanModel.find().exec();
        if (!allLoans || allLoans.length == 0) {
            throw new common_1.HttpException('Loans not found', common_1.HttpStatus.NOT_FOUND);
        }
        return allLoans;
    }
    async getLoanById(id) {
        const loan = await this.loanModel.findById(id).exec();
        if (loan) {
            return loan;
        }
        throw new common_1.HttpException('Loan not found', common_1.HttpStatus.NOT_FOUND);
    }
    async updateLoans(id, updateLoanDto) {
        const loanData = await this.loanModel.findByIdAndUpdate(id, updateLoanDto, {
            new: true,
        });
        if (!loanData) {
            throw new common_1.HttpException('Post not found', common_1.HttpStatus.NOT_FOUND);
        }
        return loanData;
    }
    async deleteLoans(id) {
        const deletedLoan = await this.loanModel.findByIdAndDelete(id);
        if (!deletedLoan) {
            throw new common_1.HttpException('Loan not found', common_1.HttpStatus.NOT_FOUND);
        }
        return deletedLoan;
    }
};
exports.LoanService = LoanService;
exports.LoanService = LoanService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(application_schema_1.Loan.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], LoanService);
//# sourceMappingURL=application.service.js.map