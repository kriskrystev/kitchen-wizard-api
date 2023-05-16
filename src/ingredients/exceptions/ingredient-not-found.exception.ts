import { NotFoundException } from '@nestjs/common';

export class IngredientNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Ingredient with ID '${id}' not found.`);
  }
}
