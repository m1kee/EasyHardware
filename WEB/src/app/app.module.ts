/* Angular Stuff*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
/* Routing */
import { APP_ROUTING } from './app.routing';
/* Main Component */
import { AppComponent } from './app.component';
/* Categories */
import { CategoryComponent } from './components/categories/category/category.component';
import { CategoryListComponent } from './components/categories/category/category-list/category-list.component';
import { CategoryDetailComponent } from './components/categories/category/category-detail/category-detail.component';
import { CategoryService } from './components/categories/category.service';
/* Products */
import { ProductComponent } from './components/products/product/product.component';
import { ProductListComponent } from './components/products/product/product-list/product-list.component';
import { ProductDetailComponent } from './components/products/product/product-detail/product-detail.component';
import { ProductService } from './components/products/product.service';
/* Shared */
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { WorkInProgressComponent } from './components/shared/work-in-progress/work-in-progress.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoginComponent } from './components/shared/login/login.component';
import { RegisterComponent } from './components/shared/register/register.component';
import { ForgotPasswordComponent } from './components/shared/forgot-password/forgot-password.component';
/* Services */
import { LocalStorageService } from './services/local-storage.service';


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        CategoryComponent,
        ProductComponent,
        ProductListComponent,
        PageNotFoundComponent,
        WorkInProgressComponent,
        CategoryDetailComponent,
        CategoryListComponent,
        NavbarComponent,
        ProductDetailComponent,
        LoginComponent,
        RegisterComponent,
        ForgotPasswordComponent
    ],
    imports: [
        BrowserModule,
        APP_ROUTING,
        HttpClientModule,
        FontAwesomeModule,
        BrowserAnimationsModule,
        CollapseModule.forRoot(),
        BsDropdownModule.forRoot()
    ],
    providers: [CategoryService, ProductService, LocalStorageService],
    bootstrap: [AppComponent]
})
export class AppModule { }
