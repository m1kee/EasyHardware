import { Component, OnInit } from '@angular/core';
import { CategoryService } from '@services/category.service';
import { faShoppingCart, faAngleDown, faSignOutAlt, faUserCircle, faList, faBoxOpen, faStore, faBoxes, faCreditCard, faBroom, faFrown, faPlus, faMinus, faTrashAlt, faReceipt } from '@fortawesome/free-solid-svg-icons';
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
import { PurchaseService } from '../../../services/purchase.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { IPurchase } from '../../../domain/purchase';
import { BsDropdownToggleDirective } from 'ngx-bootstrap/dropdown/public_api';

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
        private router: Router,
        private purchaseService: PurchaseService
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
        faTrashAlt: faTrashAlt,
        faReceipt: faReceipt 
    };
    menuBehavior: any = {
        isCollapsed: true
    };

    admin: Profiles = Profiles.Administrator;

    ngOnInit() {
        this.categoryService.getAll(true).subscribe((categories: ICategory[]) => {
            console.log('categories: ', categories);
            this.categories = categories;
        }, (error) => {
              console.log('categories error: ', error);
        });

        this.authService.loggedUser.subscribe((user: IUser) => {
            this.user = user;
        });
    };

    // Shopping cart stuff
    addToCart(product: IProduct): void {
        this.shoppingCartService.add(product);
    };

    substractFromCart(product: IProduct): void {
        this.shoppingCartService.substract(product);
    };

    removeFromCart(productId: number): void {
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

    payButton: any = this.getDefaultPayButton();

    getDefaultPayButton() {
        return {
            message: 'Pagar',
            isLoading: false
        };
    };

    pay(shoppingCartDropdown: BsDropdownToggleDirective, loginFormDropdown: BsDropdownToggleDirective) {
        if (!this.isAuthenticated()) {
            this.toastrService.error('Para pagar debe iniciar sesión.', 'Error');
            shoppingCartDropdown.isOpen = false;
            loginFormDropdown.isOpen = true;
            return;
        }

        if (this.getCartItems().length === 0) {
            this.toastrService.error('No hay items en el carrito de compras.', 'Error');
            return;
        }

        this.payButton.isLoading = true;
        this.payButton.message = 'Pagando...';
        this.purchaseService.post(this.user.Id, this.shoppingCartService.get()).subscribe((purchase: IPurchase) => {
            let timerInterval;
            let options: SweetAlertOptions = {
                title: 'Pagando...',
                html: '<span>Conectando con el servidor de pagos...</span>',
                timer: 4000,
                onBeforeOpen: () => {
                    Swal.showLoading();
                    let steps = ["Realizando pago...", "Restando stock...", "Generando boleta..."];
                    let currentStep = -1;

                    timerInterval = setInterval(() => {
                        currentStep++;
                        Swal.getContent().querySelector('span').textContent = steps[currentStep];
                    }, 1000);
                },
                onClose: () => {
                    clearInterval(timerInterval)
                },
                allowOutsideClick: () => !Swal.isLoading()
            }
            Swal.fire(options).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    this.payButton = this.getDefaultPayButton();
                    shoppingCartDropdown.isOpen = false;
                    this.toastrService.success('Su compra se ha efectuado correctamente.', 'Pago Registrado');
                    this.clearShoppingCart();
                    this.router.navigate(['/purchase-list', purchase.Code]);
                }
            })
        },
        (error) => {
            this.payButton = this.getDefaultPayButton();
            this.toastrService.error('No se pudo procesar su pago, intente nuevamente.', 'Error');
        });
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
