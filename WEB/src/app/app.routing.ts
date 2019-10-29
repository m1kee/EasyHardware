import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './components/products/product/product-list/product-list.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { CategoryComponent } from './components/categories/category/category.component';
import { WorkInProgressComponent } from './components/shared/work-in-progress/work-in-progress.component';

const routes: Routes = [
    { path: '', redirectTo: '/product-list', pathMatch: 'full' },
    { path: 'product-list', component: ProductListComponent },
    { path: 'product-list/:categoryCode', component: ProductListComponent },
    { path: 'maintenance/category', component: CategoryComponent },
    { path: 'maintenance/category/:categoryCode', component: CategoryComponent },
    { path: 'maintenance/product', component: WorkInProgressComponent },
    { path: 'maintenance/product/:productCode', component: WorkInProgressComponent },
    { path: 'maintenance/store', component: WorkInProgressComponent },
    { path: 'maintenance/store/:storeCode', component: WorkInProgressComponent },
    { path: 'maintenance/stock', component: WorkInProgressComponent },
    { path: 'maintenance/my-account', component: WorkInProgressComponent },
    { path: '**', component: PageNotFoundComponent }
];

export const APP_ROUTING = RouterModule.forRoot(routes);
