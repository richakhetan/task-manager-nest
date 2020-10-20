import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { User } from '../users/userSchema';


@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService,
        private readonly jwtService: JwtService) { }

    async login(user: User) {
        const payload = {username: user.email}
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

}
