import { forwardRef, Inject, Injectable, Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'src/users/CreateUserdto';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { UsersService } from './users/users.service';
import { User } from './users/userSchema';
import { AuthService } from './auth/auth.service';
import { TasksService } from './tasks/tasks.service';
import { CreateTaskDto } from './tasks/createTaskdto';
import { Printer } from 'prettier';
import { Task } from './tasks/taskSchema';

@Injectable()
export class AppService {

    constructor(private readonly usersService: UsersService, private readonly authService: AuthService,
        private readonly tasksService: TasksService) { }

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

    async updateUser(createUserDto: CreateUserDto): Promise<{ "message": string }> {
        return this.usersService.updateUser(createUserDto)
    }

    async deleteUser(id: number): Promise<{ "message": string }> {
        return this.usersService.deleteUserById(id)
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto)
    }

    async readAllTask(owner: Types.ObjectId): Promise<Task[]> {
        return this.tasksService.findAllTasks(owner)
    }

    async deleteTask(owner: Types.ObjectId, id: Types.ObjectId): Promise<{ "message": string }> {
        return this.tasksService.deleteTask(owner, id)
    }

    async updateTask(owner: Types.ObjectId, id: Types.ObjectId, createTaskDto: CreateTaskDto): Promise<Task | { "message": string }> {
        return this.tasksService.updateTask(owner, id, createTaskDto)
    }
}
