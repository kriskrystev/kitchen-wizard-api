import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy as Jwt } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { JWT_CONSTANTS } from "../../constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Jwt) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_CONSTANTS.secret
        });
    }

    async validate(payload: any) {
        return {
            userId: payload.sub,
            email: payload.email
        };
    }
}
