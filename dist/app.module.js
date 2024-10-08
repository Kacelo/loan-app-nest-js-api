"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const users_module_1 = require("./public/users/users.module");
const loan_module_1 = require("./public/loans/loan.module");
const search_module_1 = require("./search/search.module");
const auth_module_1 = require("./auth/auth.module");
const documents_module_1 = require("./public/documents/documents.module");
const schedule_1 = require("@nestjs/schedule");
const company_module_1 = require("./public/companies/company.module");
require("dotenv").config();
const uri = process.env.DATABASE_URL;
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            loan_module_1.LoanModule,
            users_module_1.UsersModule,
            search_module_1.SearchModule,
            auth_module_1.AuthModule,
            company_module_1.CompanyModule,
            documents_module_1.DocumentsModule,
            mongoose_1.MongooseModule.forRoot(uri),
            schedule_1.ScheduleModule.forRoot(),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map