import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { LoginAuthDto } from './dto';
const bcryptjs = require('bcryptjs');

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepo: EntityRepository<User>
    ) { }

    async login (loginData : LoginAuthDto) : Promise<any> {
        const { email, password} = loginData;
        var user : User = await this.userRepo.findOne({
            email : email
        });
        var compare : Boolean = await bcryptjs.compare(password, user.password);
        if(compare){
            return user;
        }else {
            return false;
        }
    }
}
