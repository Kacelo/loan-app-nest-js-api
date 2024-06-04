import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/public/users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signIn(username: string, pword: string): Promise<{
        access_token: string;
    }>;
}
