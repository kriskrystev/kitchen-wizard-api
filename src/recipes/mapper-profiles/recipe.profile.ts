import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { createMap, Mapper } from "@automapper/core";
import { Recipe } from "../schema/recipe.schema";
import { CreateRecipeDto } from "../dto/recipes/create-recipe.dto";
import { UpdateRecipeDto } from "../dto/recipes/update-recipe.dto";
import { ReadRecipeDto } from "../dto/recipes/read-recipe.dto";

@Injectable()
export class RecipeProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, Recipe, ReadRecipeDto);
            createMap(mapper, CreateRecipeDto, Recipe);
            createMap(mapper, UpdateRecipeDto, Recipe);
        }
    }
}
