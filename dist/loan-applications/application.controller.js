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
const common_1 = require("@nestjs/common");
const application_service_1 = require("./application.service");
const create_application_dto_1 = require("./dto/create-application-dto");
const update_application_dto_1 = require("./dto/update-application-dto");
let loanController = class loanController {
    constructor(loanService) {
        this.loanService = loanService;
    }
    async getAllLoans(response) {
        try {
            const allLoans = await this.loanService.getAllLoans();
            return response.status(common_1.HttpStatus.OK).json({
                message: 'All applications data found successfully',
                allLoans,
            });
        }
        catch (error) {
            return response.status(error.status).json(error.response);
        }
    }
    async createLoan(response, createLoanDto) {
        try {
            const newLoan = await this.loanService.createLoan(createLoanDto);
            return response.status(common_1.HttpStatus.CREATED).json({
                message: 'Application has been created successfully',
                newLoan,
            });
        }
        catch (error) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                statusCoe: 400,
                message: 'Error: Student not created!',
                error: 'Bad Request',
            });
        }
    }
    async replaceLoan(response, id, updateLoanDto) {
        try {
            const existingLoan = await this.loanService.updateLoans(id, updateLoanDto);
            return response.status(common_1.HttpStatus.OK).json({
                message: 'Application has been successfully updated',
                existingLoan,
            });
        }
        catch (error) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                statusCoe: 400,
                message: 'Error: Application not updated!',
                error: 'Bad Request',
            });
        }
    }
    async deleteLoan(response, id) {
        try {
            const deletedApplication = await this.loanService.deleteLoans(id);
            return response.status(common_1.HttpStatus.OK).json({
                message: 'Application has been deleted successfully',
                deletedApplication,
            });
        }
        catch (error) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                statusCoe: 400,
                message: 'Error: Application not deleted!',
                error: 'Bad Request',
            });
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], loanController.prototype, "getAllLoans", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_application_dto_1.CreateLoanDto]),
    __metadata("design:returntype", Promise)
], loanController.prototype, "createLoan", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_application_dto_1.UpdateLoanDto]),
    __metadata("design:returntype", Promise)
], loanController.prototype, "replaceLoan", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], loanController.prototype, "deleteLoan", null);
loanController = __decorate([
    (0, common_1.Controller)('loans'),
    __metadata("design:paramtypes", [application_service_1.LoanService])
], loanController);
exports.default = loanController;
//# sourceMappingURL=application.controller.js.map