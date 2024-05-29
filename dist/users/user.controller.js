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
const user_service_1 = require("./user.service");
const createUser_dto_1 = require("./dto/createUser.dto");
const updateUser_dto_1 = require("./dto/updateUser.dto");
let usersController = class usersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getAllUsers(response) {
        try {
            const userData = await this.usersService.getAllUsers();
            return response.status(common_1.HttpStatus.OK).json({
                message: 'All users data found successfully',
                userData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async getUsersById(response, id) {
        try {
            const existingUser = await this.usersService.getUserById(id);
            return response.status(common_1.HttpStatus.OK).json({
                message: 'User found successfully',
                existingUser,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async createUser(response, createUserDto) {
        try {
            const newUser = await this.usersService.createUser(createUserDto);
            return response.status(common_1.HttpStatus.CREATED).json({
                message: 'User has been created successfully',
                newUser,
            });
        }
        catch (err) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                statusCoe: 400,
                message: 'Error: Student not created!',
                error: 'Bad Request',
            });
        }
    }
    async replaceUser(response, id, updateUserDto) {
        try {
            const existingUser = await this.usersService.updateUser(id, updateUserDto);
            return response.status(common_1.HttpStatus.OK).json({
                message: 'user has been successfully updated',
                existingUser,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async deleteUser(response, id) {
        try {
            const deletedUser = await this.usersService.deleteUser(id);
            return response.status(common_1.HttpStatus.OK).json({
                message: 'User deleted successfully',
                deletedUser,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], usersController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], usersController.prototype, "getUsersById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createUser_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], usersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, updateUser_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], usersController.prototype, "replaceUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], usersController.prototype, "deleteUser", null);
usersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UsersService])
], usersController);
exports.default = usersController;
//# sourceMappingURL=user.controller.js.map