import { IProductCategory } from '@domain/product-category';
import { ICategory } from '@domain/category';

export interface IProduct {
    Id: number;
    Name: string;
    Price: number;
    Description: string;
    PartNumber: string;
    Active: boolean;
    Categories: ICategory[];
}
