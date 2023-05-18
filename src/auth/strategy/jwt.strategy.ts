import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy as Jwt } from 'passport-jwt';
import { JWT_CONSTANTS } from '../../constants';
import { AuthenticatedUserInfo } from '../models/authenticated-user-info';
import { JwtSignaturePayload } from '../models/jwt-signature-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Jwt) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_CONSTANTS.secret
    });
  }

  validate(payload: JwtSignaturePayload): AuthenticatedUserInfo {
    return {
      userId: payload.sub,
      email: payload.email
    };
  }
}
