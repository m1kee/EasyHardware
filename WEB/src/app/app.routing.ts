import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from '@components/products/product/product-list/product-list.component';
import { PageNotFoundComponent } from '@components/shared/page-not-found/page-not-found.component';
import { WorkInProgressComponent } from '@components/shared/work-in-progress/work-in-progress.component';
import { CategoryCrudComponent } from '@components/maintenance/category-crud/category-crud.component';
import { StoreCrudComponent } from '@components/maintenance/store-crud/store-crud.component';
import { ProductCrudComponent } from './components/maintenance/product-crud/product-crud.component';
import { PurchaseListComponent } from './components/purchases/purchase-list/purchase-list.component';
import { StockCrudComponent } from './components/maintenance/stock-crud/stock-crud.component';

const routes: Routes = [
    { path: '', redirectTo: '/product-list', pathMatch: 'full' },
    { path: 'product-list', component: ProductListComponent },
    { path: 'product-list/:categoryCode', component: ProductListComponent },
    { path: 'purchase-list', component: PurchaseListComponent },
    { path: 'purchase-list/:purchaseCode', component: PurchaseListComponent },
    { path: 'maintenance/category', component: CategoryCrudComponent },
    { path: 'maintenance/category/:categoryCode', component: CategoryCrudComponent },
    { path: 'maintenance/product', component: ProductCrudComponent },
    { path: 'maintenance/product/:productCode', component: ProductCrudComponent },
    { path: 'maintenance/store', component: StoreCrudComponent },
    { path: 'maintenance/store/:storeCode', component: StoreCrudComponent },
    { path: 'maintenance/stock', component: StockCrudComponent },
    { path: 'maintenance/my-account', component: WorkInProgressComponent },
    { path: '**', component: PageNotFoundComponent }
];

export const APP_ROUTING = RouterModule.forRoot(routes);
