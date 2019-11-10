import { Component, OnInit } from '@angular/core';
import { CategoryService } from '@services/category.service';
import { faShoppingCart, faAngleDown, faSignOutAlt, faUserCircle, faList, faBoxOpen, faStore, faBoxes, faCreditCard, faBroom, faFrown, faPlus, faMinus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ICategory } from '@domain/category';
import { ShoppingCartService } from '@services/shopping-cart.service';
import { ShoppingCartItem } from '@domain/shopping-cart-item';
import { AuthService } from '@services/auth.service';
import { ICredentials } from '@domain/credentials';
import { IUser } from '@domain/user';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Profiles } from '@domain/enums';
import { Router } from '@angular/router';
import { IProduct } from '@domain/product';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    constructor(private categoryService: CategoryService,
        private shoppingCartService: ShoppingCartService,
        private authService: AuthService,
        private toastrService: ToastrService,
        private router: Router
    ) { }

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
        faFrown: faFrown,
        faPlus: faPlus,
        faMinus: faMinus,
        faTrashAlt: faTrashAlt
    };
    menuBehavior: any = {
        isCollapsed: true
    };

    admin: Profiles = Profiles.Administrator;

    ngOnInit() {
        this.categoryService.getAll(true).subscribe((categories: ICategory[]) => {
            console.log('categories: ', categories);
            this.categories = categories;
        });

        this.authService.loggedUser.subscribe((user: IUser) => {
            this.user = user;
        });
    };

    // Shopping cart stuff
    addToCart(product: IProduct): void {
        console.log('adding to cart: ', product);
        this.shoppingCartService.add(product);
    };

    substractFromCart(product: IProduct): void {
        console.log('substracting from cart: ', product);
        this.shoppingCartService.substract(product);
    };

    removeFromCart(productId: number): void {
        console.log('removing to cart: ', productId);
        this.shoppingCartService.remove(productId);
    };

    getCartItems(): ShoppingCartItem[] {
        return this.shoppingCartService.get();
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


    // Authentication stuff
    credentials: ICredentials = {
        Username: null,
        Password: null
    };
    user: IUser = null;
    logout = () => {
        this.authService.logout();
        this.router.navigate(['']);
    };
    isAuthenticated = () => {
        return this.authService.isAuthenticated();
    };
    signIn = () => {
        this.authService.login(this.credentials).subscribe((user: IUser) => {
            this.credentials.Username = null;
            this.credentials.Password = null;
            console.log('Welcome: ', user.Name);
            this.toastrService.success(user.Name, 'Bienvenido');
        }, (response) => {
            this.toastrService.error(response.error.Message, 'Inicio Sesión');
        });
    };
    hasPermissions = (requiredProfiles: number[]) => {
        return this.authService.hasPermissions(requiredProfiles);
    };
}
