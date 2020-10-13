import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/interfaces/product';
import { NgForm } from '@angular/forms';
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service';

@Component({
  selector: 'app-products-shop',
  templateUrl: './products-shop.component.html',
  styleUrls: ['./products-shop.component.css']
})
export class ProductsShopComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('cardInfo', { static: false }) cardInfo: ElementRef;

  stripe;
  loading = false;
  confirmation;
  productSelected: Product;

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;
  display = false;
  products: Array<any>;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productsService: ProductService,
    private cd: ChangeDetectorRef,
    private stripeService: AngularStripeService) { }


  ngOnInit(): void {
    this.getProducts();
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

  buyProduct(product: Product) {
    this.productsService.buy({ productId: product.id, userId: 3 }).subscribe((response) => {
      console.log(response);
    });
  }

  showDialog(product: Product) {
    this.productSelected = product;
    this.display = true;
  }

  ngAfterViewInit() {
    this.stripeService.setPublishableKey('pk_test_51HZPYfKegYWvj4PppG7lCzNi8HUbgLYDT4FPzoUTwZgk47IH0jmYgGOz8FcWCMytFdANR0Gvtww1iPAFbx4ydzGY000oUPo0vA').then(stripe => {
      this.stripe = stripe;
      const elements = stripe.elements();
      this.card = elements.create('card');
      this.card.mount(this.cardInfo.nativeElement);
      this.card.addEventListener('change', this.cardHandler);
    });
  }
  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  async onSubmit(form: NgForm) {
    const { token, error } = await this.stripe.createToken(this.card);

    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Success!', token);
      this.productsService.buyWithStripe({ tokenId: token.id, productId: 1, userId: 1 }).subscribe(res =>
        this.display = false);
    }
  }
}
