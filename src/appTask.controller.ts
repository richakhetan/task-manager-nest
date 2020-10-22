import { Body, Controller, Delete, forwardRef, Get, Inject, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { create } from 'domain';
import { Types } from 'mongoose';
import { AppService } from './app.service';
import { JWTAuthGuard } from './auth/guards/jwt-auth-guard';
import { CreateTaskDto } from './tasks/createTaskdto';
import { Task } from './tasks/taskSchema';
import { User } from './users/userSchema';

@Controller('tasks')
export class AppTaskController {
    constructor(private appService: AppService) { }

    @Post("/createTask")
    @UseGuards(JWTAuthGuard)
    async createTask(@Req() req) {
        let createTaskdto: CreateTaskDto = req.body
        const user: User = req.user
        createTaskdto.owner = user._id
        return this.appService.createTask(createTaskdto)
    }

    @Get("/readAllTask")
    @UseGuards(JWTAuthGuard)
    async readAllTask(@Req() req): Promise<Task[]> {
        const user: User = req.user
        return this.appService.readAllTask(user._id)
    }

    @Delete("/deleteTask/:id")
    @UseGuards(JWTAuthGuard)
    async deleteTask(@Req() req, @Param("id") id: string): Promise<{ "message": string }> {
        const user: User = req.user
        return this.appService.deleteTask(user.id, new Types.ObjectId(id))
    }

    @Patch("/updateTask/:id")
    @UseGuards(JWTAuthGuard)
    async updateTask(@Req() req, @Param("id") id: string): Promise<Task | { "message": string }> {
        const user: User = req.user
        const createTaskdto: CreateTaskDto = req.body
        return this.appService.updateTask(user.id, new Types.ObjectId(id), createTaskdto)
    }

}
