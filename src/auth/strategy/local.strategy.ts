import { PassportStrategy } from '@nestjs/passport';
import { Strategy as Local } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';
import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception';

@Injectable()
export class LocalStrategy extends PassportStrategy(Local) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email'
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new InvalidCredentialsException();
    }

    return user;
  }
}
