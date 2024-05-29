import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/user.service';
import { encodePassword } from 'src/utils/bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private UsersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pword: string): Promise<any> {
    const hashedPassword = encodePassword(pword);
    const users = await this.UsersService.getAllUsers();
    const foundUser = users.find((user) => user.username === username);
    if (foundUser.password !== hashedPassword) {
      throw new UnauthorizedException();
    }
    const payload = { sub: foundUser.id, username: foundUser.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
