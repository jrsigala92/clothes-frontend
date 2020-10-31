import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductService } from 'src/app/shared/services/product.service';
// declare const require: any;
@Component({
  selector: 'app-products-section',
  templateUrl: './products-section.component.html',
  styleUrls: ['./products-section.component.css']
})
export class ProductsSectionComponent implements OnInit, AfterViewInit {

  products: Array<any>;
  constructor(
    private productsService: ProductService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  ngAfterViewInit() {
    import('../../../../assets/js/jquery.min.js');
    import('../../../../assets/js/jquery.min.js');
    import('../../../../assets/js/jquery.dropotron.min.js');
    import('../../../../assets/js/jquery.scrolly.min.js');
    import('../../../../assets/js/jquery.scrollex.min.js');
    import('../../../../assets/js/browser.min.js');
    import('../../../../assets/js/breakpoints.min.js');
    import('../../../../assets/js/util.js');
    import('../../../../assets/js/main.js');
  }

  getProducts() {
    this.productsService.getAll().subscribe((response) => {
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
    console.log(this.products);
  }

}
