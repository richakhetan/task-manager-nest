import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Exclude } from "class-transformer"
import { Document, Types } from "mongoose"

@Schema()
export class User extends Document {

    @Prop({ type: Types.ObjectId })
    id: Types.ObjectId

    @Prop({ type: String, unique: false, trim: true, minLength: 5, required: true })
    name: string

    @Prop({ type: String, unique: true, trim: true, required: true })
    email: string

    @Prop({ type: String, trim: true, required: true })
    password: string

    @Prop({ type: Number })
    age: number

    @Prop({ type: String })
    token: string

}

export const UserSchema = SchemaFactory.createForClass(User);