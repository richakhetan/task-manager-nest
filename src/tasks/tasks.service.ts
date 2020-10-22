import { Injectable, Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { throws } from 'assert';
import { exception, timeEnd } from 'console';
import { Model, Types } from 'mongoose';
import { CreateTaskDto } from './createTaskdto';
import { Task } from './taskSchema';

@Injectable()
export class TasksService {

    constructor(@InjectModel(Task.name) private readonly taskModel: Model<Task>) { }

    async findOne(id: Types.ObjectId, owner: Types.ObjectId) {
        let task = this.taskModel.findById({ _id: id })
        if (!task) {
            throw new Error("Task not Found")
        }
        return task
    }

    async findAllTasks(owner: Types.ObjectId): Promise<Task[]> {
        return this.taskModel.find({ owner: owner })
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        let task: Task = new this.taskModel(createTaskDto)
        task.save()
        return task
    }

    async deleteTask(owner: Types.ObjectId, id: Types.ObjectId): Promise<{ "message": string }> {
        let task = this.findOne(id, owner)
        this.taskModel.deleteOne({ _id: id })
        return { "message": "Task Deleted" }
    }

    async updateTask(owner: Types.ObjectId, id: Types.ObjectId, createTaskDto: CreateTaskDto): Promise<Task | { "message": string }> {
        let task = this.findOne(id, owner)
        return this.taskModel.updateOne({ _id: id }, { title: createTaskDto.title, description: createTaskDto.description })
    }

}
