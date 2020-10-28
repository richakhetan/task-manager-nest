import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { ConfigService } from 'src/config/config.service';
import { UsersService } from 'src/users/users.service';
import { User, UserSchema } from 'src/users/userSchema';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: ConfigService.constants().jwtSecret,
      signOptions: { expiresIn: ConfigService.constants().sessionTime },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  providers: [AuthService, JwtStrategy, UsersService],
  exports: [JwtStrategy, PassportModule, AuthService, UsersService]
})
export class AuthModule { }
