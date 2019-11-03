import { IStock } from './stock';

export interface IStore {
    Id: number;
    Name: string;
    Description: string;
    Location: string;
    Active: boolean;
}
