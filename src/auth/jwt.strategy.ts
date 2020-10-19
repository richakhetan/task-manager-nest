import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport";
import { ExtractJwt } from "passport-jwt";
import { jwtConstants } from "src/constants/jwtconstants";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/userSchema";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        })
    }

    async validate(payload: string): Promise<User> {
        let user = await this.userService.findUser(payload)
        if (!user) {
            throw new UnauthorizedException()
        }
        return user
    }

}