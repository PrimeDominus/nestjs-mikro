import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { User } from 'src/user/user.entity';
const env = process.env;

@Injectable()
export class LoginMiddleware implements NestMiddleware {

  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepo: EntityRepository<User>
  ) { }

  async use(req: Request, res: Response, next: NextFunction) {
    // console.log('login middleware...=====================================================================================================');
    const token: any = req.headers['token'];
    if (!token) {
      throw new HttpException({
        message: "Unauthorize",
        errors: "Please provide valid Token."
      }, HttpStatus.NON_AUTHORITATIVE_INFORMATION);
      return false;
    }

    const payload = this.jwtService.verify(token, {
      secret: env.JWT_SECRET_KEY
    })


    const loginData = await this.userRepo.findOne({ id: payload.id }, {
      // populate: ['permission']
      disableIdentityMap: true
    });

    req.user = loginData;
    // req.user = {
    //   id : loginData.id,
    //   email : loginData.email
    // }
    console.log("loginData : ", req.user);
    // console.log("loginData : ", loginData.permission);
    

    next();

  }
}
