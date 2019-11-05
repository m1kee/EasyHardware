import { Component, OnInit } from '@angular/core';
import { ProductService } from '@services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '@services/category.service';
import { faStar, faStarHalfAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { IProduct } from '../../../../domain/product';
import { ICategory } from '../../../../domain/category';
import { ShoppingCartService } from '../../../../services/shopping-cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    products: IProduct[] = [];
    category: ICategory = null;
    icons: any = {
        faStar: faStar,
        faStarHalfAlt: faStarHalfAlt,
        faShoppingCart: faShoppingCart
    };
    constructor(private productService: ProductService,
        private activatedRoute: ActivatedRoute,
        private categoryService: CategoryService,
        private shoppingCartService: ShoppingCartService
    ) { }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe((paramsMap: any) => {
            if (paramsMap.params.categoryCode) {
                this.categoryService.getByCode(paramsMap.params.categoryCode).subscribe((category: ICategory) => {
                    this.category = category;
                    this.getProducts(this.category.Code);
                });
            } else {
                this.getProducts(null);
            }
        });        
    };

    getProducts(categoryCode: string): void {
        if (categoryCode) {
            console.warn('productService.filter(category) isn\'t implemented using getAll.');
            this.productService.getAll().subscribe((products: any[]) => {
                this.products = products;
                console.log('products: ', products);
            });
        } else {
            this.productService.getAll().subscribe((products: any[]) => {
                this.products = products; 
                console.log('products: ', products);
            });
        }
    };

    addToCart(product: IProduct): void {
        this.shoppingCartService.add(product);
    };
}
