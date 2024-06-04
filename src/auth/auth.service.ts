import { Injectable, UnauthorizedException } from '@nestjs/common';
import { encodePassword } from 'src/utils/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/public/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pword: string): Promise<{ access_token: string }> {
    const hashedPassword = encodePassword(pword);
    const user = await this.usersService.findOne(username);
    if (user?.password !== pword) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
