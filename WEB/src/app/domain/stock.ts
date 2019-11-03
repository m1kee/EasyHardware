import { IStore } from './store';

export interface IStock {
    Id: number;
    ProductId: number;
    StoreId: number;
    Product: any;
    Store: IStore;
}
