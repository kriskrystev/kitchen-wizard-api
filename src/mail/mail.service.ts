import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { join } from "path";

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {
    }

    /**
     * Sends a welcoming email to the newly registered user
     * @param to email of recipient
     */
    async sendGreetingEmail(to: string) {
        await this.mailerService.sendMail({
            to: to,
            template: join(__dirname, '/templates/welcome.hbs'),
            subject: "Welcome to KitchenWizard",
            context: {
                loginLink: "http://localhost:3000/login" // this needs to be different, depending on the environment
            }
        });
    }
}
