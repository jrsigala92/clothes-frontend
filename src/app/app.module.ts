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
import {DialogModule} from 'primeng/dialog';
import {FileUploadModule} from 'primeng/fileupload';
import {ToastModule} from 'primeng/toast';
import {GalleriaModule} from 'primeng/galleria';

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
import { WithdrawComponent } from './pages/users/user-form/withdraw/withdraw.component';
import { SizesComponent } from './pages/sizes/sizes.component';
import { SizeService } from './shared/services/size.service';
import { SizeFormComponent } from './pages/sizes/size-form/size-form.component';
import { SizesListComponent } from './pages/sizes/sizes-list/sizes-list.component';
import { MatDialogRef } from '@angular/material/dialog';
import { NewsComponent } from './pages/layout/news/news.component';
import { ProductsSectionComponent } from './pages/layout/products-section/products-section.component';
import { FooterComponent } from './pages/layout/footer/footer.component';
import { HeaderComponent } from './pages/layout/header/header.component';
import { ProductDetailComponent } from './pages/products/product-detail/product-detail.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { MessageService } from 'primeng/api';

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
    ClassificationsListComponent,
    WithdrawComponent,
    SizesComponent,
    SizeFormComponent,
    SizesListComponent,
    NewsComponent,
    ProductsSectionComponent,
    FooterComponent,
    HeaderComponent,
    ProductDetailComponent,
    ShoppingCartComponent
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
    CardModule,
    DialogModule,
    FileUploadModule,
    ToastModule,
    GalleriaModule
  ],
  providers: [DatePipe, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
