import { Optional } from "@nestjs/common"
import { isAlphanumeric, MinLength } from "class-validator"
import { Types } from "mongoose"

export class CreateTaskDto {

    @MinLength(5)
    title: string

    @MinLength(10)
    description: string

    @Optional()
    owner: Types.ObjectId

}