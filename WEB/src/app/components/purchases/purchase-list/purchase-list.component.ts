import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../../../services/purchase.service';
import { AuthService } from '../../../services/auth.service';
import { faEye, faTimes } from '@fortawesome/free-solid-svg-icons';
import { IPurchase } from '../../../domain/purchase';
import { IPurchaseDetail } from '../../../domain/purchase-detail';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-purchase-list',
    templateUrl: './purchase-list.component.html',
    styleUrls: ['./purchase-list.component.css']
})
export class PurchaseListComponent implements OnInit {

    private purchases: any = [];
    private currentPurchase: IPurchase = null;
    private paginationConfig: any = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.purchases.count
    };
    icons: any = {
        faEye: faEye,
        faTimes: faTimes
    };
    loading: boolean = false;
    constructor(private purchaseService: PurchaseService, private authService: AuthService, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.getAllMyPurchases();
    }

    public getAllMyPurchases() {
        let loggedUser = this.authService.currentUserValue;
        this.loading = true;
        this.purchaseService.getAll(loggedUser.Id).subscribe((purchases: IPurchase[]) => {
            console.log('my purchases: ', purchases);
            this.purchases = purchases;
            this.activatedRoute.paramMap.subscribe((paramsMap: any) => {
                if (paramsMap.params.purchaseCode) {
                    if (purchases && purchases.length > 0) {
                        let foundedPurchase = purchases.find((purchase, index, list) => { return purchase.Code == paramsMap.params.purchaseCode });
                        if (foundedPurchase) {
                            this.currentPurchase = foundedPurchase;
                        }
                    }
                }
            });     

            this.loading = false;
        });
    };
    public pageChanged($event) {
        this.paginationConfig.currentPage = $event;
    };
    public getBadgeClass(purchase) {
        if (!purchase || !purchase.PurchaseState)
            return;

        let badgeClass: string = '';

        switch (purchase.PurchaseState.State) {
            case 'Pendiente':
                badgeClass = 'warning';
                break;
            case 'Pagado':
                badgeClass = 'success';
                break;
        }

        return badgeClass;
    };
    public calculateTotal(purchaseDetails: IPurchaseDetail[]) {
        let total = 0;
        if (purchaseDetails && purchaseDetails.length > 0) {
            for (var i = 0; i < purchaseDetails.length; i++) {
                let detail = purchaseDetails[i];

                total += detail.Quantity * detail.ProductValue;
            }
        }
        return total;
    };

    public viewDetails(purchase: IPurchase) {
        this.currentPurchase = purchase;
    };
    public closeDetails() {
        this.currentPurchase = null;
    }
}
