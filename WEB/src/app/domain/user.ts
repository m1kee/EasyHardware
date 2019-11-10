import { IUserAdress } from './user-adress';

export interface IUser {
    Id: number;
    UserName: string;
    Password: string;
    Name: string;
    LastName: string;
    Email: string;
    Phone: string;
    ProfileId: number;
    Token?: any;
    UserAdress: IUserAdress[];
}
