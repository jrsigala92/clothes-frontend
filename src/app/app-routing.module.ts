import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

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
    {path: ':productId', component: ProductsComponent},
    {path: ':productId', component: ProductFormComponent}
  ]},
  {path: 'auth', loadChildren: () => import('./authentication/authentication.module').then(module => module.AuthenticationModule) },

  // { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
