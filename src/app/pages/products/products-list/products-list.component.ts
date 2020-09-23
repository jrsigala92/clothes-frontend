import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { StatusService } from 'src/app/shared/services/status.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Array<any>;
  categories: Array<any>;
  statuses: Array<any>;
  start: Date;
  end: Date;
  es: any;

  columns = [
    {title: 'Nombre', field: 'name'},
    {title: 'Descripción', field: 'description'},
    {title: 'Precio', field: 'price'},
    {title: 'Ganancia', field: 'profit'},
    {title: 'Usuario', field: 'userProfit'},
    {title: 'Donacion', field: 'donation'},
    {title: 'En línea', field: 'displayInShop'},
    {title: 'Fecha de Creación', field: 'createdAtFormated'},
    {title: 'Categoría', field: 'categoryName'},
    // {title: 'Status', field: 'status'},
    {title: 'Status', field: 'statusName'},
    {title: 'Usuario', field: 'userName'}
  ];
  filteredData: Product[];
  @Input() data: Product[];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productsService: ProductService,
    private categoriesService: CategoryService,
    private statusesService: StatusService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getCategories();
    this.getStatuses();
    this.getProducts();
    this.es = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'],
      dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
      dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
      monthNames: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
      monthNamesShort: [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ],
      today: 'Today',
      clear: 'Clear',
      dateFormat: 'dd/mm/yyyy',
      weekHeader: 'Wk'
  };
  }

  getProducts() {
    this.productsService.getAll().subscribe((response) => {
      console.log(response);
      this.products = response;
      this.assignProperties();
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

  assignProperties(){
    this.products.forEach(e => {
      e.categoryName = e.category ? e.category.name : null;
      e.statusName = e.status ? e.status.name : null;
      e.createdAtFormated = this.datePipe.transform(e.createdAt, 'dd-MM-yyyy');
      e.createdAt = new Date(e.createdAt);
      e.userName = e.user.firstName + ' ' + e.user.lastName + ' ' + e.user.phone;
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
   async handleProductDelete(product: Product){
    await this.productsService.delete(product.id).subscribe((response) => {
      console.log(response);
      this.productsService.getAll().subscribe( (x) => {
        this.products = x;
      });
    }, (err) => {
      console.error(err);
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

  dateSelected() {
    if(this.start && this.end){
      console.log(this.start);
      console.log(this.end);
      console.log(this.products);
      this.filteredData = this.products.filter(item => {
        let flag = false;
        console.log(typeof (item.createdAt));
        if (item.createdAt >= this.start && item.createdAt <= this.end) {
          flag = true;
          console.log('entro', item.createdAt);
        }
        else {
          console.log('no entro', item.createdAt);
        }
        return flag;
      });
    }
  }
}
