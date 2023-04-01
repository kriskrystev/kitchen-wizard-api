import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateRecipeDto } from './create-recipe.dto';

export class UpdateRecipeDto extends PartialType(
  OmitType(CreateRecipeDto, ['ingredients', 'time'] as const)
) {}
