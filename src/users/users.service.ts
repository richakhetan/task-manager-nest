import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './CreateUserdto';
import { User } from './userSchema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    async findUser(email: string): Promise<User | undefined> {
        const user = await this.userModel.findOne({ email: email })
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
        return await this.userModel.findOne({ _id: id })
    }

    async updateUser(createUserDto: CreateUserDto): Promise<string> {

        let userDto = await this.userModel.findOne({ email: createUserDto.email })
        console.log(userDto)
        if (userDto) {
            let keys = Object.keys(createUserDto)
            keys.forEach(key => userDto[key] = createUserDto[key])
            return "User Updated"
        }

        return "No User Found or Empty Email Id";
    }

    async deleteUserById(id: number): Promise<string> {
        let userDto = await this.userModel.findById(id);
        if (userDto) {
            userDto.remove();
            return "User Deleted"
        }
        return "No User Found";
    }
}
