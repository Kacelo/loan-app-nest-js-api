import { Dto } from 'src/lib/dto/dto';
export declare class AuthUserDto extends Dto<AuthUserDto> {
    id: string;
    email: string;
    username?: string;
    password?: string;
}
