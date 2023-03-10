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
    
    const token: any = req.headers['token'];
    if (!token) {
      throw new HttpException({
        message: "Unauthorize",
        errors: "Please provide valid Token."
      }, HttpStatus.NON_AUTHORITATIVE_INFORMATION);
    }

    let payload
    try {
      payload = this.jwtService.verify(token, {
        secret: env.JWT_SECRET_KEY
      })
    } catch (e) {
      throw new HttpException(
        {
          message: 'Token error',
          errors: e,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }


    const loginData = await this.userRepo.findOne({ id: payload.id }, {
      disableIdentityMap: true
    });

    req.user = loginData;
    next();

  }
}
