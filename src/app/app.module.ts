import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DatePipe} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';

import {CarouselModule} from 'primeng/carousel';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {CardModule} from 'primeng/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataListComponent } from './shared/components/data-list/data-list.component';
import { UsersComponent } from './pages/users/users.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { ClientsListComponent } from './pages/clients/clients-list/clients-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ClientFormComponent } from './pages/clients/client-form/client-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './pages/products/products.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { InputTextModule } from 'primeng/inputtext';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { CategoryFormComponent } from './pages/categories/category-form/category-form.component';
import { StatusesComponent } from './pages/statuses/statuses.component';
import { StatusFormComponent } from './pages/statuses/status-form/status-form.component';
import { StatusesListComponent } from './pages/statuses/statuses-list/statuses-list.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { MenuComponent } from './pages/layout/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsShopComponent } from './pages/products/products-shop/products-shop.component';
import { PercentagesComponent } from './pages/percentages/percentages.component';
import { PercentageFormComponent } from './pages/percentages/percentage-form/percentage-form.component';
import { PercentagesListComponent } from './pages/percentages/percentages-list/percentages-list.component';
import { ClassificationFormComponent } from './pages/classifications/classification-form/classification-form.component';
import { ClassificationsComponent } from './pages/classifications/classifications.component';
import { ClassificationsListComponent } from './pages/classifications/classifications-list/classifications-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DataListComponent,
    UsersComponent,
    UsersListComponent,
    UserFormComponent,
    ClientsComponent,
    ClientsListComponent,
    ClientFormComponent,
    ProductsComponent,
    ProductFormComponent,
    ProductsListComponent,
    CategoriesComponent,
    CategoriesListComponent,
    CategoryFormComponent,
    StatusesComponent,
    StatusFormComponent,
    StatusesListComponent,
    MenuComponent,
    ProductsShopComponent,
    PercentagesComponent,
    PercentageFormComponent,
    PercentagesListComponent,
    ClassificationFormComponent,
    ClassificationsComponent,
    ClassificationsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    InputTextModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    CarouselModule,
    TableModule,
    DropdownModule,
    CalendarModule,
    ButtonModule,
    PanelModule,
    CardModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
