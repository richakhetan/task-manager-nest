import { IsEmail, MinLength } from "class-validator"

export class CreateUserDto {

    @MinLength(5)
    readonly name: string

    @IsEmail()
    readonly email: string

    @MinLength(8)
    readonly password: string
    
    readonly age: number
    readonly tokens: string
}