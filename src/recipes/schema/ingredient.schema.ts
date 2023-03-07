import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AutoMap } from "@automapper/classes";
import { Document, HydratedDocument } from "mongoose";

export type IngredientDocument = HydratedDocument<Ingredient>;

@Schema()
export class Ingredient extends Document {

    @AutoMap()
    id: string;

    @Prop({ required: true })
    @AutoMap()
    title: string;

    @Prop()
    @AutoMap()
    description: string;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
