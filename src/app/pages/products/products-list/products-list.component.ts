import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { StatusService } from 'src/app/shared/services/status.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Array<any>;
  categories: Array<any>;
  statuses: Array<any>;
  columns = [
    {title: 'Nombre', field: 'name'},
    {title: 'Descripción', field: 'description'},
    {title: 'Precio', field: 'price'},
    {title: 'Disponible', field: 'available'},
    {title: 'Fecha de Creación', field: 'createdAt'},
    {title: 'Categoría', field: 'categoryName'},
    // {title: 'Status', field: 'status'},
    {title: 'Status', field: 'statusName'},
    {title: 'Usuario', field: 'user'}
  ];
  filteredData: any[];
  @Input() data: Product[];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productsService: ProductService,
    private categoriesService: CategoryService,
    private statusesService: StatusService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getStatuses();
    this.getProducts();
  }

  getProducts() {
    this.productsService.getAll().subscribe((response) => {
      console.log(response);
      this.products = response;
      this.products.forEach(e => {
        e.categoryName = e.category ? e.category.name : null;
        e.statusName = e.status ? e.status.name : null;
      });
      this.filteredData = this.products.slice();
    }, (err) => {
      console.error(err);
    });
   }

   async getCategories(){
     return this.categoriesService.getAll().subscribe((response) => {
       this.categories = response;
       this.categories.unshift({id: 0 , name: 'Todas'});
     });
   }
   async getStatuses(){
    return this.statusesService.getAll().subscribe((response) => {
      this.statuses = response;
      this.statuses.unshift({id: 0 , name: 'Todos'});
    });
  }

  openUser(id: number){
     this.router.navigate([id], {
       relativeTo: this.activatedRoute
     });
   }

   handleProductSelect(product: Product){
     this.router.navigate([product.id], {
       relativeTo: this.activatedRoute
     });
   }

   categorySelected(e){
    if (e.value.name === 'Todas'){
      this.filteredData = this.products.slice();
      return;
    }
    this.filteredData = this.products.filter(item => {
      let flag = false;
      if (item.categoryName === e.value.name){
        flag = true;
      }
      return flag;
    });
   }

   statusSelected(e){
    if (e.value.name === 'Todos'){
       this.filteredData = this.products.slice();
       return;
     }

    this.filteredData = this.products.filter(item => {
      let flag = false;
      if (item.statusName === e.value.name){
        flag = true;
      }
      return flag;
    });
  }


}
