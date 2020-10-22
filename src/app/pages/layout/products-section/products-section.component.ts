import { Component, OnInit, AfterViewInit } from '@angular/core';
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
    private productsService: ProductService
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
      console.log(response);
      this.products = response.filter(item => {
        return item.displayInShop;
      });
    }, (err) => {
      console.error(err);
    });
  }

}
