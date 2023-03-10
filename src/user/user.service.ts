import { Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { User } from './user.entity';
import { CreateUserDto } from './dto';
import { UserRepository } from './user.repository';
import { IUserRO } from './user.interface';
const bcryptjs = require('bcryptjs');
const bcryptSalt = 10;

@Injectable()
export class UserService {
    constructor(
        private readonly userRepo : UserRepository
    ) { }
    

    private buildUserRO(user: User) {
        const userRO = {
            name: user.name,
            email: user.email,
            password : user.password,
            createdAt : user.createdAt,
            updatedAt : user.updatedAt
        };

        return { user: userRO };
    }

    async createUser (dto : CreateUserDto) : Promise<IUserRO> {
        const { name, email, password } = dto;
        const user = new User(name, email, password);

        const errors = await validate(user);
        
        user.password = await bcryptjs.hash(user.password, bcryptSalt);
        

        if(errors.length > 0) {
            throw new Error("Wrong Data Validation");
            
        }else {
            var data = await this.userRepo.persistAndFlush(user);
            console.log("data : ", data);
            
            return this.buildUserRO(user);

        }
    }
}
