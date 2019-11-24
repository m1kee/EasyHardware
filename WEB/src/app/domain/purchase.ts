import { IPurchaseDetail } from './purchase-detail';
import { IPurchaseState } from './purchase-state';

export interface IPurchase {
    Id: number;
    Client: number;
    Code: string;
    Date: Date;
    StateId: number;
    Total: number;

    PurchaseState: IPurchaseState;
    PurchaseDetail: IPurchaseDetail[];
}
