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

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  {path: 'users', component: UsersComponent, children:
  [
    {path: '', component: UsersListComponent},
    {path: ':userId', component: UserFormComponent}
  ]},
  {path: 'products', component: UsersComponent, children:
  [
    {path: '', component: ProductsListComponent},
    {path: 'shop', component: ProductsShopComponent},
    {path: ':productId', component: ProductFormComponent}
  ]},
  {path: 'categories', component: CategoriesComponent, children:
  [
    {path: '', component: CategoriesListComponent},
    {path: ':categoryId', component: CategoryFormComponent}
  ]},
  {path: 'statuses', component: StatusesComponent, children:
  [
    {path: '', component: StatusesListComponent},
    {path: ':statusId', component: StatusFormComponent}
  ]},
  {path: 'auth', loadChildren: () => import('./authentication/authentication.module').then(module => module.AuthenticationModule) },

  // { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
