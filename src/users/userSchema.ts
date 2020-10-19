import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema()
export class User extends Document {

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

    toJSON() {
        const user = this.toObject()
        delete user.password
        return user
    }

    toString() {
        return JSON.stringify(this.toJSON())
    }

}

export const UserSchema = SchemaFactory.createForClass(User);