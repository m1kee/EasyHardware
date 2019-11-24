import { IStore } from './store';

export interface IStockFilters {
    ProductName: string;
    Stores: IStore[];
}
