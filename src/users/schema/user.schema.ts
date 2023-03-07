import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { AutoMap } from "@automapper/classes";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

    @Prop({required: true})
    @AutoMap()
    firstName: string;

    @Prop({required: true})
    @AutoMap()
    lastName: string;

    @Prop({ required: true })
    @AutoMap()
    email: string;

    @Prop({ required: true })
    @AutoMap()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
