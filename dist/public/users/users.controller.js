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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const bcrypt_1 = require("../../utils/bcrypt");
const updateUser_dto_1 = require("./dto/updateUser.dto");
const updateCompanyDto_1 = require("../companies/dto/updateCompanyDto");
const createCompanyDto_1 = require("../companies/dto/createCompanyDto");
const constants_1 = require("../../auth/constants");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    async signupUser(userData) {
        const password = (0, bcrypt_1.encodePassword)(userData.password);
        console.log("encoded password", password);
        return this.userService.createUser({ ...userData, password });
    }
    async replaceUser(response, id, updateUserDto) {
        try {
            const existingUser = await this.userService.updateUser(id, updateUserDto);
            return response.status(common_1.HttpStatus.OK).json({
                message: "user has been successfully updated",
                existingUser,
            });
        }
        catch (err) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                message: "user has not been successfully updated",
            });
        }
    }
    async getAllUsers(response) {
        try {
            const userData = await this.userService.getAllUsers();
            return response.status(common_1.HttpStatus.OK).json({
                message: "All users data found successfullyy",
                userData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async getUsersById(response, id) {
        try {
            const existingUser = await this.userService.getUserById(id);
            return response.status(common_1.HttpStatus.OK).json({
                message: "User found successfully",
                existingUser,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async deleteUser(response, id) {
        try {
            const deletedUser = await this.userService.deleteUser(id);
            return response.status(common_1.HttpStatus.OK).json({
                message: "User deleted successfully",
                deletedUser,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async updateUser(response, id, updateUserDto) {
        try {
            const updatedUser = await this.userService.updateUser(id, updateUserDto);
            return response.status(common_1.HttpStatus.OK).json(updatedUser);
        }
        catch (err) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                message: "Error: User not updated!",
                error: err.message,
            });
        }
    }
    async createCompany(response, userId, createCompanyDto) {
        try {
            const company = await this.userService.createCompany(userId, createCompanyDto);
            return response.status(common_1.HttpStatus.CREATED).json(company);
        }
        catch (err) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                message: "Error: Company not created!",
                error: err.message,
            });
        }
    }
    async updateCompany(response, companyId, updateCompanyDto) {
        try {
            const company = await this.userService.updateCompany(companyId, updateCompanyDto);
            return response.status(common_1.HttpStatus.OK).json(company);
        }
        catch (err) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                message: "Error: Company not updated!",
                error: err.message,
            });
        }
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signupUser", null);
__decorate([
    (0, common_1.Post)("update/:id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, updateUser_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "replaceUser", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)("/:id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsersById", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Patch)("update/:id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, updateUser_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, constants_1.Public)(),
    (0, common_1.Post)("create-company/:userId"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("userId")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, createCompanyDto_1.CreateCompanyDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createCompany", null);
__decorate([
    (0, common_1.Patch)("update-company/:companyId"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("companyId")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, updateCompanyDto_1.UpdateCompanyDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateCompany", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)("user"),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map