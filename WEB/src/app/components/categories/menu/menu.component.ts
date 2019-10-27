import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    categories: any = [];

    constructor(private categoryService: CategoryService) { }

    ngOnInit() {
        this.categoryService.getAll().subscribe((categories: any[]) => {
            console.log('categories: ', categories);
            this.categories = categories;
        });
    }

}
