import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { RecipeProfile } from './mapper-profiles/recipe.profile';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { Recipe, RecipeSchema } from './schema/recipe.schema';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      {
        name: Recipe.name,
        schema: RecipeSchema
      }
    ])
  ],
  controllers: [RecipesController],
  providers: [RecipesService, RecipeProfile, UsersService],
  exports: [RecipesService]
})
export class RecipesModule {}
