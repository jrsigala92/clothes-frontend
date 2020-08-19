import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  {path: 'users', component: UsersComponent, children:
  [
    {path: '', component: UsersListComponent},
    {path: ':userId', component:UserFormComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
