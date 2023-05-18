import { AutoMap } from '@automapper/classes';
import { ReadIngredientDto } from '../../ingredients/dto/read-ingredient.dto';
import { RecipeType } from '../enums/recipe-type.enum';

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

  @AutoMap()
  time: Date;

  @AutoMap()
  price: number;

  @AutoMap(() => [ReadIngredientDto])
  ingredients: ReadIngredientDto[];
}
