import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AutoMap } from "@automapper/classes";
import { RecipeType } from "../enums/recipe-type.enum";
import { Ingredient, IngredientDocument, IngredientSchema } from "./ingredient.schema";
import { Document, HydratedDocument, Types } from "mongoose";

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

    @Prop({ type: [IngredientSchema], required: true })
    @AutoMap(() => Ingredient)
    ingredients: Types.DocumentArray<IngredientDocument>;

    @Prop({ required: true })
    @AutoMap()
    time: Date;

    @Prop({ required: true })
    @AutoMap()
    price: number;

    @AutoMap()
    @Prop()
    userId: string;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
