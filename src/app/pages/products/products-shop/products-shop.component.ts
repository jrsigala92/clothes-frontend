import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/interfaces/product';
import { DomSanitizer } from '@angular/platform-browser';
import { ShoppingCartElemService } from 'src/app/shared/services/shopping-cart-elem.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-products-shop',
  templateUrl: './products-shop.component.html',
  styleUrls: ['./products-shop.component.css']
})
export class ProductsShopComponent implements OnInit {

  @ViewChild('cardInfo', { static: false }) cardInfo: ElementRef;

  loading = false;
  confirmation;

  products: Array<any>;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productsService: ProductService,
    private sanitizer: DomSanitizer,
    private shoppingCartService: ShoppingCartElemService,
    private messageService: MessageService) { }


  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getAll().subscribe((response) => {
      console.log(response);
      this.products = response.filter(item => {
        return item.displayInShop;
      });

      for (let index = 0; index < this.products.length; index++) {
        if (this.products[index].files.length > 0) {
          this.productsService.getImage(this.products[index].files[0].name).subscribe(imgresponse => {
            let objectUrl = URL.createObjectURL(imgresponse);
            this.products[index].image = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
            console.log(this.products[index]);
          },
            error => {
              console.log(error);
            });
        }
      }
    }, (err) => {
      console.error(err);
    });
  }

  buyProduct(product: Product) {
    this.productsService.buy({ productId: product.id, userId: 3 }).subscribe((response) => {
      console.log(response);
    });
  }

  addToCart(product){
    // const shoppingCartElem = {product.id, 1};
    this.shoppingCartService.insert({productId: product.id, userId: 9, price: product.price, name: product.name}).subscribe(res => {
      this.messageService.add({severity:'success', summary:'Producto', detail:'Producto agregado al carrito de compras'});
      console.log(res);
    }, 
    err => {
      this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
    });
  }
}
