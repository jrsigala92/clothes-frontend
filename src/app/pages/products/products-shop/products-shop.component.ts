import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-products-shop',
  templateUrl: './products-shop.component.html',
  styleUrls: ['./products-shop.component.css']
})
export class ProductsShopComponent implements OnInit {

  products: Array<any>;
  constructor(private router: Router, private activatedRoute:ActivatedRoute, private productsService:ProductService) { }


  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getAll().subscribe((response) =>{
      console.log(response);
      this.products = response.filter(item => {
        return item.displayInShop;
      });
    }, (err) =>{
      console.error(err);
    });
   }

   buyProduct(product: Product){
     this.productsService.buy({productId: product.id, userId: 3 }).subscribe((response) => {
      console.log(response);
     });
   }
}
