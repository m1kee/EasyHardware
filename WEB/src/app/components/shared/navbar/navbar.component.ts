import { Component, OnInit } from '@angular/core';
import { CategoryService } from '@services/category.service';
import { faShoppingCart, faAngleDown, faSignOutAlt, faUserCircle, faList, faBoxOpen, faStore, faBoxes, faCreditCard, faBroom, faFrown } from '@fortawesome/free-solid-svg-icons';
import { ICategory } from '@domain/category';
import { ShoppingCartService } from '@services/shopping-cart.service';
import { ShoppingCartItem } from '@domain/shopping-cart-item';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    constructor(private categoryService: CategoryService, private shoppingCartService: ShoppingCartService) { }

    categories: any = [];
    icons: any = {
        faShoppingCart: faShoppingCart,
        faAngleDown: faAngleDown,
        faSignOutAlt: faSignOutAlt,
        faUserCircle: faUserCircle,
        faList: faList,
        faBoxOpen: faBoxOpen,
        faStore: faStore,
        faBoxes: faBoxes,
        faCreditCard: faCreditCard,
        faBroom: faBroom,
        faFrown: faFrown
    };
    menuBehavior: any = {
        isCollapsed: true
    };

    ngOnInit() {
        this.categoryService.getAll(true).subscribe((categories: ICategory[]) => {
            console.log('categories: ', categories);
            this.categories = categories;
        });
    };

    getCartItems(): ShoppingCartItem[] {
        return this.shoppingCartService.get();
    };

    logout() {
        console.log('you\'re successfully logout');
    };

    getCartTotal() {
        let shoppingCart = this.getCartItems();
        let total: number = 0;
        if (shoppingCart && shoppingCart.length > 0) {
            shoppingCart.forEach((cartItem: ShoppingCartItem) => {
                total += cartItem.Count * cartItem.Item.Price;
            });
        }
        return total;
    };

    clearShoppingCart() {
        this.shoppingCartService.clear();
    };
}
