import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateTaskDto } from './createTaskdto';
import { TasksService } from './tasks.service';
import { Task, TaskSchema } from './taskSchema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])],
  providers: [TasksService],
  exports:[TasksService]
})
export class TasksModule { }
