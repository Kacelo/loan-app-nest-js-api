import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/public/users/users.service";
import { CreateUserDto } from "src/public/users/dto/createUser.dto";
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signIn(username: string, pword: string): Promise<{
        access_token: string;
    }>;
    signUp(createUserDto: CreateUserDto): Promise<{
        access_token: string;
    }>;
}
