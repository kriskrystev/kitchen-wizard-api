import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as Local } from 'passport-local';
import { User } from '../../users/schema/user.schema';
import { AuthService } from '../auth.service';
import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception';

@Injectable()
export class LocalStrategy extends PassportStrategy(Local) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email'
    });
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new InvalidCredentialsException();
    }

    return user;
  }
}
