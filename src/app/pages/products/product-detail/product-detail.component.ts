import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem, ImageItem } from 'ng-gallery';
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
  images: GalleryItem[]=[];
  
  constructor(
      private productsService: ProductService,
      private activatedRoute: ActivatedRoute,
      private sanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {    
    this.activatedRoute.params.subscribe(async urlParams => {
      console.log('antes');
      // this.getProduct(urlParams.productId);
      await this.getProduct(2);
      // await this.productsService.getWithImages(2).subscribe(res =>{ 
      //   console.log(res);
      //   this.product = res.prod;
      //   this.images = res.images;
        
      // });
      console.log('despues');

    });
  }
  async getProduct(id: number) {
    this.isLoading = true;

     this.productsService.getElement(id).subscribe(async (response) => {
      this.product = response;
      this.isLoading = false;
      console.log(response);
      this.product.files.forEach(img => {
         // this.images.push(this.productsService.getImage(img.name));
         this.productsService.getImage(img.name).subscribe(imgresponse => {
           console.log(imgresponse);
           let objectUrl = URL.createObjectURL(imgresponse);
           this.images.push(new ImageItem({
             src: objectUrl,
            //  alt: '',
            //  title: ''
           }));
         },
           error => {
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
