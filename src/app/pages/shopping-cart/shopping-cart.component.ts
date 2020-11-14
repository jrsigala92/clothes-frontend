import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { parse } from 'path';
import { NgForm } from '@angular/forms';
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service';
import { MessageService } from 'primeng/api';
import { ShoppingCartElemService } from 'src/app/shared/services/shopping-cart-elem.service';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { SharedService } from 'src/app/shared/services/shared-service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('cardInfo', { static: false }) cardInfo: ElementRef;

  card: any;
  cardHandler = this.onChange.bind(this);
  stripe;
  productSelected: Product;
  paymentType = 1;
  error: string;
  display = false;

  constructor
    (private shoppingCartElemService: ShoppingCartElemService,
      private productsService: ProductService,
      private cd: ChangeDetectorRef,
      private stripeService: AngularStripeService,
      private messageService: MessageService) { }
  shoppingCartElements: Array<any>;
  total = 0;
  ngOnInit(): void {
    this.getProductsWithinShoppingCart();
  }

  async getProductsWithinShoppingCart() {
    await this.shoppingCartElemService.getAllFilteredById(9).subscribe(res => {
      this.shoppingCartElements = res;
      this.calculateTotal();
      console.log('respuesta');
      console.log(this.shoppingCartElements);
    });
    // console.log('elementos');
    // console.log(this.shoppingCartElements);
    // console.log(this.total);
    //  this.shoppingCartElements.forEach(item => {
    //   this.total = this.total + item.price;
    //   console.log(this.total);
    // });
  }

  async delete(id) {
    this.shoppingCartElemService.delete(id).subscribe(res => {
      this.shoppingCartElemService.getAllFilteredById(9).subscribe(elems => {
        this.shoppingCartElements = elems;
        this.calculateTotal();
      });
    },
      error => {
        this.messageService.add({ severity: 'danger', summary: 'Service Message', detail: 'Via MessageService' });
      });
  }

  showDialog() {
    // this.productSelected = product;
    this.display = true;
  }

  calculateTotal() {
    this.total = 0;
    this.shoppingCartElements.forEach(item => {
      this.total = this.total + Number.parseFloat(item.price);
      console.log(this.total);
    });
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
      this.productsService.buyWithStripe(
        {
          tokenId: token.id,
          productIds: this.shoppingCartElements.map(elem => elem.id),
          userId: 9
        }).subscribe(res => {
          this.display = false;
          if (res.errno) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error al procesar compra',
              detail: `La compra no pudo ser procesada. Error:${res.message}`
            });
          }
          else {
          this.messageService.add({
            severity: 'success',
            summary: 'Compra realizada con éxito',
            detail: 'En breve recibirás un correo de confirmación'
          });
          this.shoppingCartElements = [];
          this.calculateTotal();
        }
      },
        error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al procesar compra',
            detail: `La compra no pudo ser procesada. Error:${error.message}`
          });
        });
    }
  }
}
