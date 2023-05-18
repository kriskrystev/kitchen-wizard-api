import { ConflictException } from '@nestjs/common';

export class IngredientAlreadyExistsException extends ConflictException {
  constructor(title: string) {
    super(`Ingredient with name '${title}' already exists.`);
  }
}
