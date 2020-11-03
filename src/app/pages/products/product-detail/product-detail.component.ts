import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  isLoading: boolean;
  images: any[] = [];
  
  constructor(
      private productsService: ProductService,
      private activatedRoute: ActivatedRoute,
      private sanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {    
    this.activatedRoute.params.subscribe(urlParams => {
      console.log(urlParams);
      // this.getProduct(urlParams.productId);
      this.getProduct(2);
    });
  }
  async getProduct(id: number) {
    this.isLoading = true;

    await this.productsService.getElement(id).subscribe((response) => {
      this.product = response;
      this.isLoading = false;
      console.log(response);
      this.product.files.forEach(img => {
        // this.images.push(this.productsService.getImage(img.name));
        this.productsService.getImage(img.name).subscribe(imgresponse => {
          console.log(imgresponse);
          let objectUrl = URL.createObjectURL(imgresponse);
          this.images.push(this.sanitizer.bypassSecurityTrustUrl(objectUrl));
        }, 
        error=>{
          console.log(error);
        });
      });
      console.log(this.product.files);
      console.log(this.images);
    }, (err) => {
      console.error('Product not found');
      this.isLoading = false;

    });
  }

  responsiveOptions:any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];

}
