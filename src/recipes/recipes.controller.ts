import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ValidMongoID } from '../utils/decorators/mongo-id-validation-decorator';
import { CreateIngredientDto } from './dto/ingredients/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/ingredients/update-ingredient.dto';
import { CreateRecipeDto } from './dto/recipes/create-recipe.dto';
import { UpdateRecipeDto } from './dto/recipes/update-recipe.dto';
import { RecipesService } from './recipes.service';

@UseGuards(JwtAuthGuard)
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto, @Request() req) {
    return this.recipesService.create(createRecipeDto, req.user.email);
  }

  @Get()
  findAll(@Request() req) {
    return this.recipesService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') @ValidMongoID() id: string) {
    return this.recipesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') @ValidMongoID() id: string,
    @Body() updateRecipeDto: UpdateRecipeDto
  ) {
    return this.recipesService.update(id, updateRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') @ValidMongoID() id: string) {
    return this.recipesService.remove(id);
  }

  @Post(':recipeId/ingredients')
  createIngredient(
    @Param('recipeId') @ValidMongoID('recipeId') recipeId: string,
    @Body() createIngredientDto: CreateIngredientDto
  ) {
    return this.recipesService.createIngredient(recipeId, createIngredientDto);
  }

  @Get(':id/ingredients')
  findIngredients(@Param('id') @ValidMongoID() id: string) {
    return this.recipesService.findIngredients(id);
  }

  @Get(':recipeId/ingredients/:ingredientId')
  findIngredient(
    @Param('recipeId') @ValidMongoID('recipeId') recipeId: string,
    @Param('ingredientId') @ValidMongoID('ingredientId') ingredientId: string
  ) {
    return this.recipesService.findIngredientById(recipeId, ingredientId);
  }

  @Delete(':recipeId/ingredients/:ingredientId')
  deleteIngredient(
    @Param('recipeId') @ValidMongoID('recipeId') recipeId: string,
    @Param('ingredientId') @ValidMongoID('ingredientId') ingredientId: string
  ) {
    return this.recipesService.removeIngredient(recipeId, ingredientId);
  }

  @Patch(':recipeId/ingredients/:ingredientId')
  updateIngredient(
    @Param('recipeId') @ValidMongoID('recipeId') recipeId: string,
    @Param('ingredientId') @ValidMongoID('ingredientId') ingredientId: string,
    @Body() updateIngredientDto: UpdateIngredientDto
  ) {
    return this.recipesService.updateIngredient(
      recipeId,
      ingredientId,
      updateIngredientDto
    );
  }
}
