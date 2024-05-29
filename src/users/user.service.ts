import { Model } from 'mongoose';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { IUser } from './user.interface';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<IUser>) {}

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const password = encodePassword(createUserDto.password)
    const createdUser = new this.userModel({...createUserDto, password});
    return createdUser.save();
  }

  async getAllUsers(): Promise<IUser[]> {
    const allUsers = await this.userModel.find().exec();
    if (!allUsers || allUsers.length == 0) {
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
    }
    return allUsers;
  }
  async getUserById(id: string):Promise<IUser> {
    const user = await this.userModel.findById(id).exec();
    if (user) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
  async updateUser(id: string, updateUserDto: UpdateUserDto) : Promise<IUser>{
    const userData = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    if (!userData) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return userData;
  }
  async deleteUser(id: string):Promise<IUser> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return deletedUser;
  }
}
