import { IProduct } from './product';

export interface IPurchaseDetail {
    Id: number;
    ProductId: number;
    ProductValue: number;
    PurchaseId: number;
    Quantity: number;

    Product: IProduct;
}
