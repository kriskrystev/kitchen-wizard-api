import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { comparePasswords } from '../utils/bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(username);
    if (!user) {
      return null;
    }

    const passwordsMatch = comparePasswords(user.password, pass);

    if (user && passwordsMatch) {
      delete user.password;

      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload)
    };
  }
}
