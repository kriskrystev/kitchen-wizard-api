import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateIngredientDto } from '../dto/create-ingredient.dto';
import { ReadIngredientDto } from '../dto/read-ingredient.dto';
import { UpdateIngredientDto } from '../dto/update-ingredient.dto';
import { Ingredient } from '../schema/ingredient.schema';

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
    };
  }
}
