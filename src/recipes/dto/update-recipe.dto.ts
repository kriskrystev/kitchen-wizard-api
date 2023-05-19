import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateRecipeDto } from './create-recipe.dto';

export class UpdateRecipeDto extends PartialType(
  OmitType(CreateRecipeDto, ['time'] as const)
) {}
