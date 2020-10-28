import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './CreateUserdto';
import { User } from './userSchema';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    async findUser(email: string): Promise<User | undefined> {
        const user = await this.userModel.findOne({ email: email })
        if (!user)
            throw new Error(ConfigService.error().userNotFound)
        return user
    }

    async login(email: string, password: string): Promise<User> {
        const user = await this.findUser(email)
        if (!bcrypt.compare(password, user.password))
            throw new Error(ConfigService.error().incorrectCredentials)
        return user

    }

    async saveUser(user: User): Promise<User> {
        return user.save()
    }

    async getNewUser(createUserDto: CreateUserDto) {
        const user = new this.userModel(createUserDto)
        user.password = await bcrypt.hash(user.password, 8)
        return user
    }

    async getUserById(id: number): Promise<User | undefined> {
        let user = await this.userModel.findOne({ _id: id })
        if (!user) {
            throw new Error(ConfigService.error().userNotFound)
        }
        return user
    }

    async updateUser(createUserDto: CreateUserDto): Promise<{ "message": string }> {

        let userDto = await this.userModel.findOne({ email: createUserDto.email })
        if (userDto) {
            let keys = Object.keys(createUserDto)
            keys.forEach(key => userDto[key] = createUserDto[key])
            this.saveUser(userDto)
            return { "message": ConfigService.error().userUpdated }
        }

        return { "message": ConfigService.error().incorrectData };
    }

    async deleteUserById(id: number): Promise<{ "message": string }> {
        let userDto = await this.getUserById(id)
        userDto.remove();
        return { "message": ConfigService.error().userDeleted }
    }
}
