import { Type } from "@nestjs/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";
import { User } from "src/users/userSchema";

@Schema()
export class Task extends Document {

    @Prop({ type: SchemaTypes.ObjectId })
    id: Types.ObjectId

    @Prop({ required: true, trim: true, minlength: 5, type: String })
    title: string

    @Prop({ required: true, trim: true, minlength: 10, type: String })
    description: string

    @Prop({ type: SchemaTypes.ObjectId, ref: User })
    owner: Types.ObjectId
}

export const TaskSchema = SchemaFactory.createForClass(Task)

