import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { User } from './users/userSchema';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/task-manager-api'),
  forwardRef(() => UsersModule), forwardRef(() => AuthModule)],
  controllers: [AppController]
})

export class AppModule {
}