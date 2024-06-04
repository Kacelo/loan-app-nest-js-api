import { AuthService } from './auth.service';
import { SignInDto } from './dto/signInDto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: SignInDto): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
}
