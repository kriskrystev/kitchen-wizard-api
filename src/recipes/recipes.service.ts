import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { ReadRecipeDto } from './dto/read-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipeConflictException } from './exceptions/recipe-conflict.exception';
import { RecipeNotFoundException } from './exceptions/recipe-not-found.exception';
import { Recipe, RecipeDocument } from './schema/recipe.schema';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
    @InjectMapper() private readonly classMapper: Mapper
  ) {}

  async create(createRecipeDto: CreateRecipeDto, userId: string): Promise<any> {
    const recipeExists = await this.recipeModel.findOne({
      title: createRecipeDto.title
    });

    if (recipeExists) {
      throw new RecipeConflictException();
    }

    const recipeEntity = new this.recipeModel(createRecipeDto);
    await recipeEntity.populate('ingredients');

    // TODO: maybe think of hooks or something else for setting these
    // virtuals?
    recipeEntity.userId = userId;
    recipeEntity.time = new Date();

    return await recipeEntity.save();
  }

  async findOne(id: string): Promise<ReadRecipeDto> {
    const recipe = await this.recipeModel.findById(id).populate('ingredients');

    if (!recipe) {
      throw new RecipeNotFoundException();
    }

    return await this.classMapper.mapAsync(recipe, Recipe, ReadRecipeDto);
  }

  // TODO: fix any
  async findAll(
    userId: string,
    documentsToSkip = 0,
    limitOfDocuments?: number,
    startId?: string
  ): Promise<any> {
    const query: FilterQuery<RecipeDocument> = { _userId: userId };

    if (startId) {
      query._id = { $gt: startId };
    }

    const findQuery = this.recipeModel
      .find(query)
      .sort({ _id: 1 })
      .skip(documentsToSkip)
      .populate('ingredients');

    if (limitOfDocuments) {
      findQuery.limit(limitOfDocuments);
    }

    const results = await findQuery;
    const count = await this.recipeModel.count();

    return {
      results: this.classMapper.mapArray(results, Recipe, ReadRecipeDto),
      count
    };
  }

  async update(
    id: string,
    updateRecipeDto: UpdateRecipeDto
  ): Promise<ReadRecipeDto> {
    const recipeEntity = await this.recipeModel
      .findByIdAndUpdate(id, updateRecipeDto, { new: true })
      .populate('ingredients');

    if (!recipeEntity) {
      throw new RecipeNotFoundException();
    }

    return await this.classMapper.mapAsync(recipeEntity, Recipe, ReadRecipeDto);
  }

  // /**
  //  * Removes a recipe from the database by making use of the findByIdAndRemove mongoose method
  //  * @param id - The id of the recipe
  //  * @throws {RecipeNotFoundException}
  //  * @returns ReadRecipeDto - The same DTO that we just deleted.
  //  */
  // async remove(id: string): Promise<ReadRecipeDto> {
  //   const recipeEntity = await this.recipeModel.findByIdAndRemove(id);

  //   if (!recipeEntity) {
  //     throw new RecipeNotFoundException();
  //   }

  //   return await this.classMapper.mapAsync(recipeEntity, Recipe, ReadRecipeDto);
  // }

  // /**
  //  * Adds a new ingredient to an existing recipe.
  //  *
  //  * This method
  //  * 1. Makes use of the findOneAndUpdate mongoose method.
  //  * 2. Filters by a recipeId
  //  * 3. Pushes a new ingredient to the recipe using the $push operator
  //  *
  //  * @param recipeId - The recipes' id to which you wish to add the ingredient
  //  * @param createIngredientDto - The DTO that represents a new ingredient
  //  * @throws {RecipeNotFoundException}
  //  * @returns ReadRecipeDto - The DTO, representing the changed recipe
  //  */
  // async createIngredient(
  //   recipeId: string,
  //   createIngredientDto: CreateIngredientDto
  // ): Promise<ReadRecipeDto> {
  //   const recipe = await this.recipeModel.findOneAndUpdate(
  //     { _id: recipeId },
  //     {
  //       $push: {
  //         ingredients: createIngredientDto
  //       }
  //     },
  //     { new: true }
  //   );

  //   if (!recipe) {
  //     throw new RecipeNotFoundException();
  //   }

  //   await recipe.save();

  //   return await this.classMapper.mapAsync(recipe, Recipe, ReadRecipeDto);
  // }

  // /**
  //  * Queries all of the ingredients for a particular recipe
  //  *
  //  * @param id - The id of the recipe
  //  * @returns CreateIngredientDto[] - An array of ingredient DTOs
  //  * @todo - Fix the return type, it should be ReadIngredientDto[]
  //  */
  // async findIngredients(id: string): Promise<CreateIngredientDto[]> {
  //   const recipe = await this.recipeModel.findById(id).exec();

  //   if (!recipe) {
  //     throw new RecipeNotFoundException();
  //   }
  //   const mappedRecipe = await this.classMapper.mapAsync(
  //     recipe,
  //     Recipe,
  //     ReadRecipeDto
  //   );
  //   return mappedRecipe.ingredients;
  // }

  // /**
  //  * Searches for an ingredient by its id
  //  * @param recipeId the recipe id to look into
  //  * @param ingredientId the id of the ingredient to lookup
  //  * @throws {RecipeNotFoundException}
  //  */
  // async findIngredientById(recipeId: string, ingredientId: string) {
  //   const recipe = await this.recipeModel.findById(recipeId);

  //   if (!recipe) {
  //     throw new RecipeNotFoundException();
  //   }

  //   const ingredients = await this.recipeModel.aggregate([
  //     { $unwind: '$ingredients' },
  //     {
  //       $match: {
  //         'ingredients._id': new mongoose.Types.ObjectId(ingredientId)
  //       }
  //     },
  //     {
  //       $project: {
  //         _id: '$ingredients._id',
  //         title: '$ingredients.title',
  //         description: '$ingredients.description'
  //       }
  //     }
  //   ]);

  //   if (!ingredients.length) {
  //     throw new IngredientNotFoundException();
  //   }

  //   return await this.classMapper.mapAsync(
  //     ingredients[0],
  //     Ingredient,
  //     ReadIngredientDto
  //   );
  // }

  // /**
  //  * Removes an ingredient
  //  *
  //  * @param recipeId - The recipe id to query by
  //  * @param ingredientId - The id of the ingredient we wish to delete
  //  * @throws {IngredientNotFoundException, RecipeNotFoundException}
  //  * @returns ReadIngredientDto[] - The new array without the deleted item from it.
  //  */
  // async removeIngredient(recipeId: string, ingredientId: string) {
  //   const recipe = await this.recipeModel.findById(recipeId);

  //   if (!recipe) throw new RecipeNotFoundException();

  //   const ingredientsLengthBeforePull = recipe.ingredients.length;
  //   const ingredients = recipe.ingredients.remove(ingredientId);

  //   if (recipe.ingredients.length === ingredientsLengthBeforePull) {
  //     throw new IngredientNotFoundException();
  //   }

  //   await recipe.save();

  //   return await this.classMapper.mapArrayAsync(
  //     ingredients,
  //     Ingredient,
  //     ReadIngredientDto
  //   );
  // }

  // /**
  //  * Updates an ingredient on a specific recipe
  //  * @throws {IngredientNotFoundException, RecipeNotFoundException}
  //  */
  // async updateIngredient(
  //   recipeId: string,
  //   ingredientId: string,
  //   updateIngredientDto: UpdateIngredientDto
  // ) {
  //   const recipe = await this.recipeModel.findById(recipeId);

  //   if (!recipe) throw new RecipeNotFoundException();

  //   const ingredient = recipe.ingredients.id(ingredientId);

  //   if (!ingredient) {
  //     throw new IngredientNotFoundException();
  //   }

  //   ingredient.title = updateIngredientDto.title;
  //   ingredient.description = updateIngredientDto.description;

  //   await recipe.save();

  //   return await this.classMapper.mapAsync(recipe, Recipe, ReadRecipeDto);
  // }
}
