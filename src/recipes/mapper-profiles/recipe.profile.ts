import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from '../dto/create-recipe.dto';
import { ReadRecipeDto } from '../dto/read-recipe.dto';
import { UpdateRecipeDto } from '../dto/update-recipe.dto';
import { Recipe } from '../schema/recipe.schema';

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
    };
  }
}
