import { ConflictException } from '@nestjs/common';

export class RecipeConflictException extends ConflictException {
  constructor() {
    super('Recipe with that name already exists');
  }
}
