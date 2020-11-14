import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { CategoryFormComponent } from './pages/categories/category-form/category-form.component';
import { StatusesComponent } from './pages/statuses/statuses.component';
import { StatusesListComponent } from './pages/statuses/statuses-list/statuses-list.component';
import { StatusFormComponent } from './pages/statuses/status-form/status-form.component';
import { ProductsShopComponent } from './pages/products/products-shop/products-shop.component';
import { PercentagesComponent } from './pages/percentages/percentages.component';
import { PercentageFormComponent } from './pages/percentages/percentage-form/percentage-form.component';
import { PercentagesListComponent } from './pages/percentages/percentages-list/percentages-list.component';
import { ClassificationsComponent } from './pages/classifications/classifications.component';
import { ClassificationsListComponent } from './pages/classifications/classifications-list/classifications-list.component';
import { ClassificationFormComponent } from './pages/classifications/classification-form/classification-form.component';
import { SizesListComponent } from './pages/sizes/sizes-list/sizes-list.component';
import { SizeFormComponent } from './pages/sizes/size-form/size-form.component';
import { SizesComponent } from './pages/sizes/sizes.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { ProductDetailComponent } from './pages/products/product-detail/product-detail.component';
import { CanActivateViaAuthGuardGuard } from './can-activate-via-auth-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  {path: 'users', component: UsersComponent, children:
  [
    {path: '', component: UsersListComponent},
    {path: 'create', component: UserFormComponent},
    {path: ':userId', component: UserFormComponent}
  ], canActivate: [CanActivateViaAuthGuardGuard] },
  {path: 'products', component: UsersComponent, children:
  [
    {path: '', component: ProductsListComponent},
    {path: 'shop', component: ProductsShopComponent},
    {path: 'create', component: ProductFormComponent},
    {path: ':productId', component: ProductFormComponent},
  ],  canActivate: [CanActivateViaAuthGuardGuard] },
  {path: 'productDetail', component: ProductDetailComponent, children:
  [
    {path: ':productId', component: ProductDetailComponent},
  ]},
  {path: 'categories', component: CategoriesComponent, children:
  [
    {path: '', component: CategoriesListComponent},
    {path: ':categoryId', component: CategoryFormComponent}
  ], canActivate: [CanActivateViaAuthGuardGuard] },
  {path: 'classifications', component: ClassificationsComponent, children:
  [
    {path: '', component: ClassificationsListComponent},
    {path: ':classificationId', component: ClassificationFormComponent}
  ], canActivate: [CanActivateViaAuthGuardGuard] },
  {path: 'sizes', component: SizesComponent, children:
  [
    {path: '', component: SizesListComponent},
    {path: ':sizeId', component: SizeFormComponent}
  ], canActivate: [CanActivateViaAuthGuardGuard]},
  {path: 'percentages', component: PercentagesComponent, children:
  [
    {path: '', component: PercentagesListComponent},
    {path: ':percentageId', component: PercentageFormComponent}
  ], canActivate: [CanActivateViaAuthGuardGuard]},
  {path: 'statuses', component: StatusesComponent, children:
  [
    {path: '', component: StatusesListComponent},
    {path: ':statusId', component: StatusFormComponent}
  ], canActivate: [CanActivateViaAuthGuardGuard]},
  {path: 'shoppingCart', component: ShoppingCartComponent, children:
  [
    {path: ':userId', component: ShoppingCartComponent},
    // {path: ':statusId', component: StatusFormComponent}
  ]},
  {path: 'auth', loadChildren: () => import('./authentication/authentication.module').then(module => module.AuthenticationModule) },

  // { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
