import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { UsersService } from './user.service';
import usersController from './user.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
    // imports: [
    //     MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    //     // Import other necessary modules here
    //   ],
    controllers: [usersController],
    providers: [UsersService, PrismaService],
    exports: [UsersService],
  })
  export class UserModule {}