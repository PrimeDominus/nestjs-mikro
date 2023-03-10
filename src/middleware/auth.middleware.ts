import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(
      
    ){}

  use(req: Request, res: Response, next: NextFunction) {
    var accessToken: any = req.headers['x-access-token'];   
    if(accessToken && accessToken === "12345"){
        next();
    } else{
        // this.customResponse.error401(res);
        throw new HttpException({
          message : "Unauthorize",
          errors: "Please provide valid x-access-token token."
        }, HttpStatus.NON_AUTHORITATIVE_INFORMATION)
    }

  }
}
