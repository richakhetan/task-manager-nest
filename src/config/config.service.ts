import { Injectable } from '@nestjs/common';

import * as path from 'path';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

@Injectable()
export class ConfigService {
    static constants(){
        const baseDir = path.join(__dirname, '../../dev.env');
        const config = dotenv.parse(fs.readFileSync(baseDir));
        return {
            port: config.PORT,
            mongoConnectionString: config.MONGODB_CONNECT,
            jwtSecret: config.SECRETKEY,
            sessionTime: config.SESSIONTIME
        }
    }

    static error(){
        return {
            taskNotFound: "Task Not Found",
            taskDeleted: "Task Deleted",
            userNotFound: "User Not Found",
            incorrectCredentials: "Username or Password incorrect",
            userUpdated: "User Updated",
            userDeleted: "User Deleted",
            incorrectData :"No User Found or Empty Email Id"
        }
    }
}
