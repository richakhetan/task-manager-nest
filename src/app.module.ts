import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { AppTaskController } from './appTask.controller';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/task-manager-api'),
    AuthModule,
    UsersModule,
    TasksModule],
  controllers: [AppController, AppTaskController],
  providers: [AppService]
})

export class AppModule {
}