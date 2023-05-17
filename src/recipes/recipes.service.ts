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

  async create(
    createRecipeDto: CreateRecipeDto,
    userId: string
  ): Promise<ReadRecipeDto> {
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

    const savedEntity = await recipeEntity.save();

    return this.classMapper.map(savedEntity, Recipe, ReadRecipeDto);
  }

  async findOne(id: string): Promise<ReadRecipeDto> {
    const recipe = await this.recipeModel.findById(id).populate('ingredients');

    if (!recipe) {
      throw new RecipeNotFoundException();
    }

    return this.classMapper.map(recipe, Recipe, ReadRecipeDto);
  }

  async findAll(
    userId: string,
    documentsToSkip = 0,
    limitOfDocuments?: number,
    startId?: string
  ): Promise<{ results: ReadRecipeDto[]; count: number }> {
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

    return this.classMapper.map(recipeEntity, Recipe, ReadRecipeDto);
  }

  async remove(id: string): Promise<ReadRecipeDto> {
    const recipeEntity = await this.recipeModel.findByIdAndRemove(id);

    if (!recipeEntity) {
      throw new RecipeNotFoundException();
    }

    return this.classMapper.map(recipeEntity, Recipe, ReadRecipeDto);
  }
}
