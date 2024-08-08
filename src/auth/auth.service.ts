import { Injectable, UnauthorizedException } from "@nestjs/common";
import { decodePassword, encodePassword } from "src/utils/bcrypt";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/public/users/users.service";
import { CreateUserDto } from "src/public/users/dto/createUser.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    username: string,
    pword: string
  ){
    // const hashedPassword = encodePassword(pword);
    const user = await this.usersService.findOne(username);
    // console.log("passwords", user?.password, hashedPassword)
    const isMatch = await decodePassword(pword, user?.password);
    console.log(isMatch)
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    console.log(payload);
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async signUp(createUserDto: CreateUserDto) {
    const { email, username, password, role } = createUserDto;
    const hashedPassword = encodePassword(password);
    const user = await this.usersService.createUser(createUserDto);
    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
