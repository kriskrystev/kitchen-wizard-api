import { AutoMap } from "@automapper/classes";
import { RecipeType } from "../../enums/recipe-type.enum";
import { ReadIngredientDto } from "../ingredients/read-ingredient.dto";
import { CreateIngredientDto } from "../ingredients/create-ingredient.dto";

export class ReadRecipeDto {

    @AutoMap()
    userId: string;

    @AutoMap()
    id: string;

    @AutoMap()
    title: string;

    @AutoMap()
    description: string;

    @AutoMap()
    type: RecipeType;

    @AutoMap(() => ReadIngredientDto)
    ingredients: CreateIngredientDto[];

    @AutoMap()
    time: Date;

    @AutoMap()
    price: number;

}
