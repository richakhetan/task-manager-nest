import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'src/dto/CreateUserdto';
import { User } from './userSchema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private readonly userModel: Model<User>,
        @Inject(forwardRef(() => { AuthService })) private readonly authService: AuthService) { }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto)
        createdUser.password = await bcrypt.hash(createdUser.password, 8)
        const { access_token } = await this.authService.login(createdUser)
        createdUser.token = access_token
        return createdUser.save()
    }

    async findUser(email: string): Promise<User | undefined> {
        const user = await this.userModel.findOne({ email: email })
        return user
    }

    async getUser(id: number): Promise<User | undefined> {
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

    async deleteUser(id: number): Promise<string> {
        let userDto = await this.userModel.findById(id);
        if (userDto) {
            userDto.remove();
            return "User Deleted"
        }
        return "No User Found";
    }
}
