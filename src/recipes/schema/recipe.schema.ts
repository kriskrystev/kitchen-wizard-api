import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { Ingredient } from '../../ingredients/schema/ingredient.schema';
import { RecipeType } from '../enums/recipe-type.enum';

export type RecipeDocument = HydratedDocument<Recipe>;

@Schema()
export class Recipe extends Document {
  @AutoMap()
  id: string;

  @Prop({ required: true })
  @AutoMap()
  title: string;

  @Prop({ required: true })
  @AutoMap()
  description: string;

  @Prop({ required: true })
  @AutoMap()
  type: RecipeType;

  @Prop({ required: true })
  @AutoMap()
  time: Date;

  @Prop({ required: true })
  @AutoMap()
  price: number;

  @AutoMap()
  @Prop()
  userId: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Ingredient.name }]
  })
  @Type(() => Ingredient)
  @AutoMap(() => [Ingredient])
  ingredients: Ingredient[];
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
