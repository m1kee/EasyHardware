/* Angular Stuff*/
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
/* Routing */
import { APP_ROUTING } from './app.routing';
/* Main Component */
import { AppComponent } from './app.component';
/* Categories */
import { CategoryService } from './services/category.service';
/* Products */
import { ProductListComponent } from './components/products/product/product-list/product-list.component';
import { ProductDetailComponent } from './components/products/product/product-detail/product-detail.component';
import { ProductService } from './services/product.service';
/* Shared */
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { WorkInProgressComponent } from './components/shared/work-in-progress/work-in-progress.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoginComponent } from './components/shared/login/login.component';
import { RegisterComponent } from './components/shared/register/register.component';
import { ForgotPasswordComponent } from './components/shared/forgot-password/forgot-password.component';
/* Services */
import { LocalStorageService } from './services/local-storage.service';
import { CategoryCrudComponent } from './components/maintenance/category-crud/category-crud.component';
import { ProductCrudComponent } from './components/maintenance/product-crud/product-crud.component';



@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        ProductListComponent,
        PageNotFoundComponent,
        WorkInProgressComponent,
        NavbarComponent,
        ProductDetailComponent,
        LoginComponent,
        RegisterComponent,
        ForgotPasswordComponent,
        CategoryCrudComponent,
        ProductCrudComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        APP_ROUTING,
        HttpClientModule,
        FontAwesomeModule,
        BrowserAnimationsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            closeButton: true,
            timeOut: 2500,
            extendedTimeOut: 1000,
            disableTimeOut: false,
            easing: 'ease-in',
            easeTime: 300,
            enableHtml: false,
            progressBar: true,
            progressAnimation: 'decreasing',
            toastClass: 'toast',
            positionClass: 'toast-top-center',
            titleClass: 'toast-title',
            messageClass: 'toast-message',
            tapToDismiss: true,
            onActivateTick: false
        }),
        CollapseModule.forRoot(),
        BsDropdownModule.forRoot(),
        NgMultiSelectDropDownModule.forRoot(),
        NgxPaginationModule,
        SweetAlert2Module.forRoot({
            confirmButtonText: 'Si',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#dc3545'
        }),
    ],
    providers: [CategoryService, ProductService, LocalStorageService],
    bootstrap: [AppComponent]
})
export class AppModule { }
