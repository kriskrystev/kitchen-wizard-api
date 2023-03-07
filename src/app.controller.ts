import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth/auth.service";
import { LocalAuthGuard } from "./auth/guards/local-auth.guard";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { MailerService } from "@nestjs-modules/mailer";
import { UsersService } from "./users/users.service";

@Controller()
export class AppController {
    constructor(
        private authService: AuthService,
        private mailerService: MailerService,
        private usersService: UsersService
    ) {
    }

    /**
     * The route handler will only be invoked if the user has been validated
     * The req parameter will contain a user property (populated by Passport during the passport-local authentication flow)
     * @param req
     */
    @UseGuards(LocalAuthGuard)
    @Post("auth/login")
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get("user/profile")
    getProfile(@Request() req) {
        return this.usersService.findUserProfile(req.user.email);
    }

    // @Post("mail")
    // async sendMail() {
    //     return await this.mailerService.sendMail({
    //         to: "k.krastev.1998@gmail.com",
    //         text: "Example Email Templating",
    //         subject: "Example Email Templating",
    //         template: "example",
    //         context: {
    //             name: "Kris"
    //         }
    //     })
    // }
}
