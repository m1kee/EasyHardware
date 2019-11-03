import { Component, OnInit } from '@angular/core';
import { CategoryService } from '@services/category.service';
import { faShoppingCart, faAngleDown, faSignOutAlt, faUserCircle, faList, faBoxOpen, faStore, faBoxes } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from '@services/local-storage.service';
import { ICategory } from '@domain/category';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private categoryService: CategoryService, private localStorageService: LocalStorageService) { }

    categories: any = [];
    icons: any = {
        faShoppingCart: faShoppingCart,
        faAngleDown: faAngleDown,
        faSignOutAlt: faSignOutAlt,
        faUserCircle: faUserCircle,
        faList: faList,
        faBoxOpen: faBoxOpen,
        faStore: faStore,
        faBoxes: faBoxes
    };
    shoppingCart: any = {
        items: []
    };
    menuBehavior: any = {
        isCollapsed: true
    };

    ngOnInit() {
        // TODO: get shopping cart items from localstorage
        this.shoppingCart.items.push('Notebook Gamer');
        this.shoppingCart.items.push('PC Gamer');
        this.shoppingCart.items.push('SSD 512 GB');
        this.shoppingCart.items.push('NVIDIA 2080TI');

        this.categoryService.getAll(true).subscribe((categories: ICategory[]) => {
            console.log('categories: ', categories);
            this.categories = categories;
        });
    }

    logout() {
        console.log('you\'re successfully logout');
    }
}
