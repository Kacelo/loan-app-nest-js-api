import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
// import { LoanModule } from './loan-applications/application.module';
// import { UserModule } from './users/user.module';
import { UsersModule } from './public/users/users.module';
import { LoanModule } from './public/loans/loan.module';
import { SearchModule } from './search/search.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './user-roles/roles.module';
import { MappedUserRoleModule } from './mapped-user-roles/mapped-user-roles.module';
require('dotenv').config();

const uri = process.env.DATABASE_URL;

@Module({
  imports: [
    LoanModule,
    UsersModule,
    SearchModule,
    AuthModule,
    RolesModule,
    MappedUserRoleModule,
    MongooseModule.forRoot(
      uri,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
