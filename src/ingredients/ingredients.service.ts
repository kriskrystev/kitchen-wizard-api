import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { IngredientAlreadyExistsException } from './exceptions/ingredient-already-exists.exception';
import { IngredientNotFoundException } from './exceptions/ingredient-not-found.exception';
import { Ingredient, IngredientDocument } from './schema/ingredient.schema';

// TODO: automap return types
@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel(Ingredient.name)
    private readonly ingredientModel: Model<IngredientDocument>,
    @InjectMapper() private readonly classMapper: Mapper
  ) {}

  async create(createIngredientDto: CreateIngredientDto) {
    const { title } = createIngredientDto;

    const existingIngredient = await this.ingredientModel
      .findOne({ title })
      .exec();
    if (existingIngredient) {
      throw new IngredientAlreadyExistsException(title);
    }

    const createdIngredient = new this.ingredientModel(createIngredientDto);
    return createdIngredient.save();
  }

  async findAll(
    userId: string,
    documentsToSkip = 0,
    limitOfDocuments?: number,
    startId?: string
  ) {
    const query: FilterQuery<IngredientDocument> = { _userId: userId };

    if (startId) {
      query._id = { $gt: startId };
    }

    const findQuery = this.ingredientModel
      .find(query)
      .sort({ _id: 1 })
      .skip(documentsToSkip);

    if (limitOfDocuments) {
      findQuery.limit(limitOfDocuments);
    }

    const results = await findQuery;
    const count = await this.ingredientModel.count();

    return { results, count };
  }

  async findOne(id: string) {
    const ingredient = await this.ingredientModel.findById(id).exec();
    if (!ingredient) {
      throw new IngredientNotFoundException(id);
    }
    return ingredient;
  }

  async update(id: string, updateIngredientDto: UpdateIngredientDto) {
    const existingIngredient = await this.ingredientModel.findById(id).exec();
    if (!existingIngredient) {
      throw new IngredientNotFoundException(id);
    }

    return this.ingredientModel
      .findByIdAndUpdate(id, updateIngredientDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    const removedIngredient = await this.ingredientModel
      .findByIdAndRemove(id)
      .exec();
    if (!removedIngredient) {
      throw new IngredientNotFoundException(id);
    }
    return removedIngredient;
  }
}
