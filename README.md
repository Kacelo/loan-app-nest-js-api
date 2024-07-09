
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Loan App Backend 

## Architecture Diagram
![Architecture Diagram](/src/assets/diagram.png)

## Features 

### User Authentication and Authorization

- User Registration: Users can sign up with their email, username, and password to create an account.
- User Login: Authenticated users can log in using their email/username and password.
- Password Reset: Users can request a password reset token and reset their password via email.
- Role-Based Access Control (RBAC): Different roles (e.g., Admin, Lender, Borrower) with specific permissions.
### Loan Management

- Loan Application: Users can apply for loans by providing necessary details like amount, interest rate, duration, etc.
- Loan Approval: Lenders can review and approve/reject loan applications.
- Loan Tracking: Keep track of loan statuses, start and end dates, repayment schedules, and comments.
- Repayment Schedules: Generate and manage repayment schedules for loans.

### Document Management

- Document Uploads: Users can upload and manage documents related to loans (e.g., ID, proof of income).
- Secure Storage: All documents are securely stored and can be accessed as needed.
- Verification Process: Faster document verification and approval process for loan applications.

### User Profiles

- Profile Management: Users can update their personal information, such as address, phone number, and social media links.
- Emergency Contacts: Users can add emergency contact details for additional security.

### User Profiles
- Profile Management: Users can update their personal information, such as address, phone number, and social media links.
- Emergency Contacts: Users can add emergency contact details for additional security.

### Notifications
- Email Notifications: Users receive email notifications for important actions like loan status changes and password resets.
- In-App Notifications: Real-time notifications within the application for updates and alerts.

### Search and Filtering
- Profile Search: Users can search for other users based on username or first name.
- Loan Search: Lenders can search for loan applications based on different criteria.

### API Documentation
- Swagger Integration: Comprehensive API documentation generated using Swagger, providing an interactive interface to explore and test the API endpoints.

### Security 
- JWT Authentication: Secure user authentication using JSON Web Tokens (JWT).
- Data Encryption: Sensitive data is encrypted to ensure security and privacy.
- Input Validation: Strict validation of input data to prevent malicious attacks.

### Deployment
- Staging and Production: Separate environments for staging and production deployments.
- Continuous Integration/Continuous Deployment (CI/CD): Automated deployment pipeline for smooth updates and maintenance.

## Technical Stack

### Backend 
- NestJS: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- Prisma: A next-generation ORM that simplifies database access and management.
- MongoDB: A NoSQL database known for its scalability and flexibility.
### Infrastructure
- AWS (Amazon Web Services): The intended infrastructure for deploying the application, leveraging various AWS services for hosting, database management, and storage.

### Other Technologies
- TypeScript: Used throughout the application for type safety and improved developer experience.
- JWT (JSON Web Tokens): Used for secure authentication and authorization.
- NodeMailer: Used for sending emails, such as password reset tokens.
- Swagger: Used for API documentation and providing an interactive interface for exploring and testing API endpoints.
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Swagger Docs
- localhost:3000/api

## Stay in touch

- Author - [Vernon Kacelo](https://twitter.com/kammysliwiec)

## Credits 
This API is built and maintained solely by Vernon Kacelo. Special thanks to the developers of the libraries and frameworks used in this project.