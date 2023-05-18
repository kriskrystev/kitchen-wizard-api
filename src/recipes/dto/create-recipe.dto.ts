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
  @ApiProperty()
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
  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  ingredients: string[];
}
