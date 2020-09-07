import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Array<any>;
  columns = [
    {title: 'Nombre', field: 'name'},
    {title: 'Descripción', field: 'description'},
    {title: 'Precio', field: 'price'},
    {title: 'Disponible', field: 'available'},
    {title: 'Fecha de Creación', field: 'createdAt'},
    {title: 'Categoría', field: 'category'},
    {title: 'Status', field: 'status'},
    {title: 'Usuario', field: 'user'}
  ]

  @Input() data:Product[];
  constructor(private router: Router, private activatedRoute:ActivatedRoute, private productsService:ProductService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.productsService.getAll().subscribe((response) =>{
      console.log(response);
      this.products = response;
    }, (err) =>{
      console.error(err);
    });
   }

  openUser(id:number){
     this.router.navigate([id], {
       relativeTo: this.activatedRoute
     });
   }
 
   handleProductSelect(product:Product){
     this.router.navigate([product.id], {
       relativeTo: this.activatedRoute
     });
   }


}
