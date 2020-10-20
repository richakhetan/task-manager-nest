import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/task-manager-api'),
    AuthModule,
    UsersModule],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule {
}