import { IStore } from './store';
import { IProduct } from './product';

export interface IStock {
    Id: number;
    ProductId: number;
    StoreId: number;
    Quantity: number;
    Product: IProduct;
    Store: IStore;
}
