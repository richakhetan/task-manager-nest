import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "src/constants/jwtconstants";
import { UsersService } from "src/users/users.service";
import { User } from "../users/userSchema";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        })
    }

    async validate(payload: { username: string }): Promise<User> {
        const { username } = payload
        console.log(username)
        let user = await this.userService.findUser(username)
        if (!user) {
            throw new UnauthorizedException()
        }
        return user
    }

}