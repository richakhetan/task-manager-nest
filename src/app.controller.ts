import { Body, Controller, Delete, forwardRef, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { JWTAuthGuard } from './auth/guards/jwt-auth-guard';
import { CreateUserDto } from './users/CreateUserdto';
import { User } from './users/userSchema';

@Controller('users')
export class AppController {
    constructor(private appService: AppService) { }

    @Post("/")
    async createUser(@Body() user: CreateUserDto): Promise<User> {
        return await this.appService.createUser(user)
    }

    @UseGuards(JWTAuthGuard)
    @Get("/:id")
    getUser(@Param('id') id: number): Promise<User> {
        return this.appService.getUser(id)
    }

    @UseGuards(JWTAuthGuard)
    @Patch("/me")
    updateUser(@Body() user: CreateUserDto): Promise<string> {
       return this.appService.updateUser(user);
    }

    @UseGuards(JWTAuthGuard)
    @Delete("/:id")
    deleteUser(@Param('id') id: number): Promise<string> {
      return this.appService.deleteUser(id)
    }

}
