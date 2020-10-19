import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/userSchema';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
    constructor(@Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService,
        private readonly jwtService: JwtService) { }

    async validate(payload: User): Promise<User | any> {
        const user = await this.usersService.findUser(payload.email);
        if (user && await bcrypt.compare(user.password, payload.password)) {
            const { password, ...result } = user
            return result
        }
        return null
    }

    async login(user: any) {
        const payload = { username: user.email, sub: user.name }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

}
