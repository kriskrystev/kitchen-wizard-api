import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IngredientsController } from './ingredients.controller';
import { IngredientsService } from './ingredients.service';
import { IngredientProfile } from './mapper-profiles/ingredient.profile';
import { Ingredient, IngredientSchema } from './schema/ingredient.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Ingredient.name,
        schema: IngredientSchema
      }
    ])
  ],
  controllers: [IngredientsController],
  providers: [IngredientsService, IngredientProfile],
  exports: [IngredientsService]
})
export class IngredientsModule {}
