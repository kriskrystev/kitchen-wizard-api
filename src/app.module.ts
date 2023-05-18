import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { MailModule } from './mail/mail.module';
import { RecipesModule } from './recipes/recipes.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.development.env' // this needs to be set depending on the env
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/kitchen-wizard'), // this needs to change depending on the env
    AutomapperModule.forRoot({
      strategyInitializer: classes()
    }),
    MailModule,

    UsersModule,
    RecipesModule,
    IngredientsModule,

    AuthModule,

    IngredientsModule
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService]
})
export class AppModule {}
