import { AutoMap } from '@automapper/classes';
import {
  ArrayNotEmpty,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString
} from 'class-validator';
import { RecipeType } from '../enums/recipe-type.enum';

export class CreateRecipeDto {
  @AutoMap()
  userId: string;

  @AutoMap()
  @IsNotEmpty()
  @IsString()
  title: string;

  @AutoMap()
  @IsNotEmpty()
  @IsString()
  description: string;

  @AutoMap()
  @IsNotEmpty()
  type: RecipeType;

  @AutoMap()
  time: Date;

  @AutoMap()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @AutoMap(() => [String])
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  ingredients: string[];
}
