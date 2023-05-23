import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/schema/user.schema';
import { UsersService } from '../users/users.service';
import { comparePasswords } from '../utils/bcrypt';
import { JwtLoginResponse } from './dto/jwt-login-response';
import { JwtSignaturePayload } from './dto/jwt-signature-payload';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
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

  login(user: any): JwtLoginResponse {
    const payload: JwtSignaturePayload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload)
    };
  }
}
