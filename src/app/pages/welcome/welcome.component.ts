import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/shared/services/authentication.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service.js';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  // constructor(private autService: AuthenticationService, private router: Router) { }

  // ngOnInit(): void {
    // if (!this.autService.isLoggedIn()){
    //   this.router.navigate(['auth/login']);
    // }
  // }
  products: Array<any>;
  constructor(
    private productsService: ProductService,
    private sanitizer: DomSanitizer,
    private autService: AuthenticationService,
     private router: Router
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  ngAfterViewInit() {
    import('../../../assets/js/jquery.min.js');
    import('../../../assets/js/jquery.min.js');
    import('../../../assets/js/jquery.dropotron.min.js');
    import('../../../assets/js/jquery.scrolly.min.js');
    import('../../../assets/js/jquery.scrollex.min.js');
    import('../../../assets/js/browser.min.js');
    import('../../../assets/js/breakpoints.min.js');
    import('../../../assets/js/util.js');
    import('../../../assets/js/main.js');
  }

  handleShoppingCartElem(elem: number){
    console.log('event emmited 3');
    console.log(elem);
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
    console.log(this.products);
  }
}
