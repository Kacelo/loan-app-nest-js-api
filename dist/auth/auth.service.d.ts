import { UsersService } from 'src/users/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private UsersService;
    private jwtService;
    constructor(UsersService: UsersService, jwtService: JwtService);
    signIn(username: string, pword: string): Promise<any>;
}
