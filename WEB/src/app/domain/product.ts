import { ICategory } from '@domain/category';
import { IStock } from '@domain/stock';

export interface IProduct {
    Id: number;
    Name: string;
    Price: number;
    Description: string;
    PartNumber: string;
    Active: boolean;
    Categories?: ICategory[];
    DefaultStock?: IStock;
}
