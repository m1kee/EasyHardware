import { IAdress } from './adress';

export interface IUserAdress {
    Id: number;
    UserId: number;
    AdressId: number;
    IsDefault: boolean;
    Active: boolean;
    Adress: IAdress;
}
