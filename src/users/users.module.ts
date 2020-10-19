import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from './users.service';
import { User, UserSchema } from './userSchema';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthService)],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule { }
