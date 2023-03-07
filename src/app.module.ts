import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { AutomapperModule } from "@automapper/nestjs";
import { classes } from "@automapper/classes";
import { RecipesModule } from "./recipes/recipes.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MailModule } from "./mail/mail.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ".development.env" // this needs to be set depending on the env
        }),
        MongooseModule.forRoot("mongodb://127.0.0.1/kitchen-wizard"),// this needs to change depending on the env
        AutomapperModule.forRoot({
            strategyInitializer: classes()
        }),
        MailModule,

        UsersModule,
        RecipesModule,

        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService, ConfigService]
})
export class AppModule {
}
