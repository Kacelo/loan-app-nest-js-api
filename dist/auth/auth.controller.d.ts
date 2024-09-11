import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/signInDto";
import { CreateUserDto } from "src/public/users/dto/createUser.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: SignInDto, response: any): Promise<any>;
    getProfile(req: any): any;
    signUp(createUserDto: CreateUserDto, response: any): Promise<any>;
}
