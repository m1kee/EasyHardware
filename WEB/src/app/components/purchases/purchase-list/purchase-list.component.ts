import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../../../services/purchase.service';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-purchase-list',
    templateUrl: './purchase-list.component.html',
    styleUrls: ['./purchase-list.component.css']
})
export class PurchaseListComponent implements OnInit {

    private purchases: any = [];
    private paginationConfig: any = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.purchases.count
    };
    loading: boolean = false;
    constructor(private purchaseService: PurchaseService, private authService: AuthService) { }

    ngOnInit() {
        this.getAllMyPurchases();
    }

    public getAllMyPurchases() {
        let loggedUser = this.authService.currentUserValue;
        this.loading = true;
        this.purchaseService.getAll(loggedUser.Id).subscribe((purchases: any[]) => {
            this.purchases = purchases;
            this.loading = false;
        });
    };
    public pageChanged($event) {
        this.paginationConfig.currentPage = $event;
    }
}
