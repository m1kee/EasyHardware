import { IProduct } from './product';
import { ICategory } from './category';

export interface IProductCategory {
    Id: number;
    ProductId: number;
    CategoryId: number;
    Product: IProduct;
    Category: ICategory;
}
