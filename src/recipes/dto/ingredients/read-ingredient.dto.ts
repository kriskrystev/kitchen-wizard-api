import { AutoMap } from "@automapper/classes";

export class ReadIngredientDto {

    @AutoMap()
    id: string;

    @AutoMap()
    title: string;

    @AutoMap()
    description: string;

}
