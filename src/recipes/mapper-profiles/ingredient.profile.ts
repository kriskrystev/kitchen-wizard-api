import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { createMap, Mapper } from "@automapper/core";
import { Ingredient } from "../schema/ingredient.schema";
import { ReadIngredientDto } from "../dto/ingredients/read-ingredient.dto";
import { CreateIngredientDto } from "../dto/ingredients/create-ingredient.dto";
import { UpdateIngredientDto } from "../dto/ingredients/update-ingredient.dto";

@Injectable()
export class IngredientProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, Ingredient, ReadIngredientDto);
            createMap(mapper, CreateIngredientDto, Ingredient);
            createMap(mapper, UpdateIngredientDto, Ingredient);
        }
    }
}
