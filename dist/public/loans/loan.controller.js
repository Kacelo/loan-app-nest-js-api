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
exports.LoanController = void 0;
const common_1 = require("@nestjs/common");
const loan_service_1 = require("./loan.service");
const createLoanDto_1 = require("./dto/createLoanDto");
const updateLoanDto_1 = require("./dto/updateLoanDto");
const mongoose_1 = require("mongoose");
const roles_decorator_1 = require("../roles/roles.decorator");
const role_enum_1 = require("../enums/role.enum");
const { ObjectId } = mongoose_1.default.Types;
let LoanController = class LoanController {
    constructor(loanService) {
        this.loanService = loanService;
    }
    async createLoan(response, createLoanDto) {
        try {
            const newLoan = await this.loanService.createLoan(createLoanDto);
            return response.status(common_1.HttpStatus.CREATED).json(newLoan);
        }
        catch (err) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                message: "Error: Loan not created!",
                error: err.message,
            });
        }
    }
    async updateLoan(response, id, updateLoanDto) {
        try {
            const updatedLoan = await this.loanService.updateLoan(id, updateLoanDto);
            return response.status(common_1.HttpStatus.OK).json(updatedLoan);
        }
        catch (err) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                message: "Error: Loan not updated!",
                error: err.message,
            });
        }
    }
    async deleteLoan(response, id, updateLoanDto) {
        try {
            const convertedId = updateLoanDto.deleted;
            const updatedLoan = await this.loanService.deleteLoan(id);
            return response.status(common_1.HttpStatus.OK).json(updatedLoan);
        }
        catch (err) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                message: "Error: Loan not updated!",
                error: err.message,
            });
        }
    }
    async getLoans(response) {
        try {
            const loanData = await this.loanService.getAllLoans();
            return response.status(common_1.HttpStatus.OK).json({
                message: "All loan data found successfullyy",
                loanData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async getLoanApplications(response, lenderId) {
        try {
            const loanData = await this.loanService.findLenderApplications(lenderId);
            return response.status(common_1.HttpStatus.OK).json({
                message: "All loan data found successfullyy",
                loanData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
};
exports.LoanController = LoanController;
__decorate([
    (0, common_1.Post)("create"),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.User),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createLoanDto_1.CreateLoanDto]),
    __metadata("design:returntype", Promise)
], LoanController.prototype, "createLoan", null);
__decorate([
    (0, common_1.Patch)("update/:id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, updateLoanDto_1.UpdateLoanDto]),
    __metadata("design:returntype", Promise)
], LoanController.prototype, "updateLoan", null);
__decorate([
    (0, common_1.Patch)("delete/:id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, updateLoanDto_1.UpdateLoanDto]),
    __metadata("design:returntype", Promise)
], LoanController.prototype, "deleteLoan", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LoanController.prototype, "getLoans", null);
__decorate([
    (0, common_1.Get)("applications/:lenderId"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("lenderId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], LoanController.prototype, "getLoanApplications", null);
exports.LoanController = LoanController = __decorate([
    (0, common_1.Controller)("loans"),
    __metadata("design:paramtypes", [loan_service_1.LoanService])
], LoanController);
//# sourceMappingURL=loan.controller.js.map