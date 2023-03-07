import { AutoMap } from "@automapper/classes";
import { Allow, IsNotEmpty } from "class-validator";

export class CreateIngredientDto {
    @IsNotEmpty()
    @AutoMap()
    title: string;

    @AutoMap()
    @Allow()
    description: string;
}
