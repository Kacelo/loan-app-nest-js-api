import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle("Loan Management API")
    .setDescription(
      "API for managing loan applications, user profiles, and company profiles in a micro-lending platform. This API supports user authentication, loan application processing, document management, and company profile management."
    )
    .setVersion("1.0")
    .addTag("loans", "Endpoints related to loan applications and management")
    .addTag("users", "Endpoints related to user profiles and authentication")
    .addTag("companies", "Endpoints related to company profiles and management")
    .addTag("documents", "Endpoints related to document uploads and management")
    .addTag(
      "auth",
      "Endpoints related to user authentication and authorization"
    )
    .addTag(
      "repayment-schedules",
      "Endpoints related to loan repayment schedules"
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}
bootstrap();
