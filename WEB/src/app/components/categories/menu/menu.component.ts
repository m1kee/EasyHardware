import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { faShoppingCart, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    categories: any = [];
    faShoppingCart: IconDefinition = faShoppingCart;
    shoppingCart: any = {
        items: []
    }

    constructor(private categoryService: CategoryService) { }

    ngOnInit() {
        // TODO: get shopping cart items from localstorage
        this.shoppingCart.items.push('Notebook Gamer');
        this.shoppingCart.items.push('PC Gamer');
        this.shoppingCart.items.push('SSD 512 GB');
        this.shoppingCart.items.push('NVIDIA 2080TI');

        // TODO: put categories in the localstorage to not go to the API
        // getting categories
        this.categoryService.getAll().subscribe((categories: any[]) => {
            console.log('categories: ', categories);
            this.categories = categories;
        });
    }

}
