import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString
} from 'class-validator';
import { RecipeType } from '../enums/recipe-type.enum';

const recipeTypes = [
  `${RecipeType.Breakfast.toString()} = Breakfast`,
  `${RecipeType.Lunch.toString()} = Lunch`,
  `${RecipeType.Dinner.toString()} = Dinner`,
  `${RecipeType.Salad.toString()} = Salad`,
  `${RecipeType.Desert.toString()} = Desert`
];
export class CreateRecipeDto {
  @AutoMap()
  userId: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @AutoMap()
  @ApiProperty({ enum: recipeTypes })
  @IsNotEmpty()
  type: RecipeType;

  @AutoMap()
  time: Date;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @AutoMap(() => [String])
  @ApiProperty({ type: [String] })
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  ingredients: string[];
}
