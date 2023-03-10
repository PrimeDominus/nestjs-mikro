
export interface IUserData {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserRO {
    user: IUserData;
}