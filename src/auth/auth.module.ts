import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JWT_CONSTANTS } from "../constants";
import { LocalStrategy } from "./strategy/local.strategy";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: JWT_CONSTANTS.secret,
            signOptions: {
                expiresIn: "15min"
            }
        })
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy
    ],
    exports: [
        AuthService
    ]
})
export class AuthModule {
}
