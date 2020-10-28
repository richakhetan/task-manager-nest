import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "src/config/config.service";
import { UsersService } from "src/users/users.service";
import { User } from "../users/userSchema";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: ConfigService.constants().jwtSecret
        })
    }

    async validate(payload: { username: string }): Promise<User> {
        const { username } = payload
        let user = await this.userService.findUser(username)
        if (!user) {
            throw new UnauthorizedException()
        }
        return user
    }

}