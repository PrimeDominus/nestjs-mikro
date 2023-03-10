import { Injectable } from "@nestjs/common";
import { Response } from "express"

@Injectable()
export class CustomResponse {

    success(res: Response, msg: any = "Success", data: any = null): any {
        return res.status(200).json({
            error: false,
            message: msg,
            data: data
        });
    }

    error422(res: Response, msg: any = "Error", data: any = null): any {
        return res.status(422).send({
            error: true,
            message: msg,
            errors: data
        });
    }

    error401(res: Response, msg: any = "Unauthorize", data: any = null): any {
        return res.status(422).send({
            error: true,
            message: msg,
            errors: data
        });
    }

    error500(res: Response, msg: any = "Inter errors", data: any = null): any {
        return res.status(501).send({
            error: true,
            message: msg,
            errors: data
        });
    }

}