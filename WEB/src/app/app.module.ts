import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/categories/menu/menu.component';
import { CategoryComponent } from './components/categories/category/category.component';

import { CategoryService } from './components/categories/category.service';

@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        CategoryComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [CategoryService],
    bootstrap: [AppComponent]
})
export class AppModule { }
