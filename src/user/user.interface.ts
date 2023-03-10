import { JsonType } from "@mikro-orm/core";

export interface IUserData {
    name: string;
    email: string;
    password: string;
    type: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserRO {
    user: IUserData;
}