import { UsersService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
export default class usersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAllUsers(response: any): Promise<any>;
    getUsersById(response: any, id: string): Promise<any>;
    createUser(response: any, createUserDto: CreateUserDto): Promise<any>;
    replaceUser(response: any, id: string, updateUserDto: UpdateUserDto): Promise<any>;
    deleteUser(response: any, id: string): Promise<any>;
}
