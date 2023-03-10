import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { wrap } from '@mikro-orm/core';
import { User } from './user.entity';
import { CreateUserDto, LoginUserDto } from './dto';
import { UserRepository } from './user.repository';
import { IUserData, IUserRO } from './user.interface';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Permission } from 'src/permission/permission.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
const bcryptjs = require('bcryptjs');
const bcryptSalt = 10;

@Injectable()
export class UserService {
    constructor(
        private readonly userRepo : UserRepository,
        @InjectRepository(Permission) private readonly permissionRepo: EntityRepository<Permission>
    ) { }
    

    private buildUserRO(user: User) {
        const userRO = {
            name: user.name,
            email: user.email,
            password : user.password,
            type : user.type,
            role : user.role,
            createdAt : user.createdAt,
            updatedAt : user.updatedAt
        };

        return { user: userRO };
    }

    async createUser (dto : CreateUserDto) : Promise<IUserRO> {
        const { name, email, password, role , type } = dto;
        const user = new User(name, email, password, type , role);

        const permissionShop = new Permission('shop', true, true, true, false);
        user.permission.add(permissionShop)

        const permissionProduct = new Permission('product', true, true, true, false);
        user.permission.add(permissionProduct)

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
