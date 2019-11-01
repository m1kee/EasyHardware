import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    products: any = [];
    category: any = {};
    constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private categoryService: CategoryService) { }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe((paramsMap: any) => {
            if (paramsMap.params.categoryCode) {
                this.categoryService.getByCode(paramsMap.params.categoryCode).subscribe((category) => {
                    this.category = category;
                    this.getProducts(this.category.Code);
                });
            } else {
                this.getProducts(null);
            }
        });        
    };

    getProducts(category: string) {
        if (category) {
            console.warn('productService.filter(category) isn\'t implemented using getAll.');
            this.productService.getAll().subscribe((products: any[]) => {
                this.products = products;

                // push some dummy products
                for (var i = 0; i < 10; i++) {
                    this.products.push({ Id: (i + 1) });
                }

                console.log('products: ', products);
            });
        } else {
            this.productService.getAll().subscribe((products: any[]) => {
                this.products = products;

                // push some dummy products
                for (var i = 0; i < 10; i++) {
                    this.products.push({ Id: (i + 1) });
                }

                console.log('products: ', products);
            });
        }
    };
}
