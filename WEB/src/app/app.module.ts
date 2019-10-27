import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/categories/menu/menu.component';
import { CategoryComponent } from './components/categories/category/category.component';

import { CategoryService } from './components/categories/category.service';
import { ProductComponent } from './components/products/product/product.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';


@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        CategoryComponent,
        ProductComponent,
        ProductListComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FontAwesomeModule,
        BrowserAnimationsModule,
        CollapseModule.forRoot(),
        BsDropdownModule.forRoot()
    ],
    providers: [CategoryService],
    bootstrap: [AppComponent]
})
export class AppModule { }
