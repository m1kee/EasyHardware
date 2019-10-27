import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    products: any = [];
    constructor() { }

    ngOnInit() {

        for (var i = 0; i < 10; i++) {
            this.products.push({ Id: (i + 1) });
        }

    }

}
