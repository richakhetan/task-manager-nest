import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { AppTaskController } from './appTask.controller';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

@Module({
  imports: [MongooseModule.forRoot(ConfigService.constants().mongoConnectionString),
    AuthModule,
    UsersModule,
    TasksModule,
    ConfigModule],
  controllers: [AppController, AppTaskController],
  providers: [AppService]
})

export class AppModule {
}