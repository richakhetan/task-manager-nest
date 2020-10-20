import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'src/users/CreateUserdto';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { UsersService } from './users/users.service';
import { User } from './users/userSchema';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AppService {

    constructor(private readonly usersService: UsersService, private readonly authService: AuthService) { }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = await this.usersService.getNewUser(createUserDto)
        const { access_token } = await this.authService.login(createdUser)
        createdUser.token = access_token
        return this.usersService.saveUser(createdUser)
    }

    async findUser(email: string): Promise<User | undefined> {
        return this.usersService.findUser(email)
    }

    async getUser(id: number): Promise<User | undefined> {
        return this.usersService.getUserById(id)
    }

    async updateUser(createUserDto: CreateUserDto): Promise<string> {
        return this.usersService.updateUser(createUserDto)
    }

    async deleteUser(id: number): Promise<string> {
        return this.usersService.deleteUserById(id)
    }
}
