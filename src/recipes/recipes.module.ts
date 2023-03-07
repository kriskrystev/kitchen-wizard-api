import { Module } from "@nestjs/common";
import { RecipesService } from "./recipes.service";
import { RecipesController } from "./recipes.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Recipe, RecipeSchema } from "./schema/recipe.schema";
import { RecipeProfile } from "./mapper-profiles/recipe.profile";
import { Ingredient, IngredientSchema } from "./schema/ingredient.schema";
import { IngredientProfile } from "./mapper-profiles/ingredient.profile";
import { UsersService } from "../users/users.service";
import { UserDocument } from "../users/schema/user.schema";
import { Model } from "mongoose";
import { UsersModule } from "../users/users.module";

@Module({
    imports: [
        UsersModule,
        MongooseModule.forFeature([
            {
                name: Ingredient.name,
                schema: IngredientSchema
            },
            {
                name: Recipe.name,
                schema: RecipeSchema
            }
        ])
    ],
    controllers: [RecipesController],
    providers: [
        RecipesService,
        IngredientProfile,
        RecipeProfile,
        UsersService
    ],
    exports: [RecipesService]
})
export class RecipesModule {
}
