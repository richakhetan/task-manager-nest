import { Body, Controller, Delete, forwardRef, Get, Inject, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
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
    @Get("/me")
    getUser(@Req() req): User {
        const user: User = req.user
        return user
    }

    @UseGuards(JWTAuthGuard)
    @Patch("/me")
    updateUser(@Body() user: CreateUserDto): Promise<{ "message": string }> {
        return this.appService.updateUser(user);
    }

}
