import { RecipeType } from "../../enums/recipe-type.enum";
import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, IsNumber } from "class-validator";
import { CreateIngredientDto } from "../ingredients/create-ingredient.dto";
import { ReadIngredientDto } from "../ingredients/read-ingredient.dto";

export class CreateRecipeDto {

    @AutoMap()
    userId: string;

    @AutoMap()
    @IsNotEmpty()
    title: string;

    @AutoMap()
    @IsNotEmpty()
    description: string;

    @AutoMap()
    @IsNotEmpty()
    type: RecipeType;

    // typeFn is used when we are reading from db
    @AutoMap(() => ReadIngredientDto)
    @IsNotEmpty()
    ingredients: CreateIngredientDto[];

    @AutoMap()
    time: Date;

    @AutoMap()
    @IsNotEmpty()
    @IsNumber()
    price: number;

}
