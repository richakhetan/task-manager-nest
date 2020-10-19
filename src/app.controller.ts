import { Body, Controller, Delete, forwardRef, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/CreateUserdto';
import { UsersService } from './users/users.service';
import { User } from './users/userSchema';

@Controller('users')
export class AppController {
    constructor(@Inject(forwardRef(()=>UsersService)) private readonly usersService: UsersService) { }

    @Post("/")
    async createUser(@Body() user: CreateUserDto): Promise<User> {
        return await this.usersService.createUser(user)
    }

    @Get("/:id")
    getUser(@Param('id') id: number): Promise<User> {
        return this.usersService.getUser(id)
    }

    @Patch("/me")
    updateUser(@Body() user: CreateUserDto): Promise<string> {
       return this.usersService.updateUser(user);
    }

    @Delete("/:id")
    deleteUser(@Param('id') id: number): Promise<string> {
      return this.usersService.deleteUser(id)
    }

}
