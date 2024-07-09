"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app
        .enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: '1',
    })
        .setGlobalPrefix(constants_1.API_PREFIX);
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Loan Management API")
        .setDescription("API for managing loan applications, user profiles, and company profiles in a micro-lending platform. This API supports user authentication, loan application processing, document management, and company profile management.")
        .setVersion("1.0")
        .addTag("loans", "Endpoints related to loan applications and management")
        .addTag("users", "Endpoints related to user profiles and authentication")
        .addTag("companies", "Endpoints related to company profiles and management")
        .addTag("documents", "Endpoints related to document uploads and management")
        .addTag("auth", "Endpoints related to user authentication and authorization")
        .addTag("repayment-schedules", "Endpoints related to loan repayment schedules")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api", app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map