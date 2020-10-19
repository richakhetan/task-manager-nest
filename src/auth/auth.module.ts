import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils/forward-ref.util';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from 'src/constants/jwtconstants';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { User, UserSchema } from 'src/users/userSchema';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    forwardRef(()=>UsersModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule, AuthService]
})
export class AuthModule { }
