import { Component, OnInit, Input, ChangeDetectorRef, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { User } from '../../../shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { FormErrorsService } from 'src/app/shared/services/form-errors.service';
import { DatePipe } from '@angular/common';
import { SelectItem } from 'primeng/api';
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service';
import { Product } from 'src/app/shared/interfaces/product';
// import { error } from 'c onsole';

// declare function setPublicKey(key: any): any;
declare var Conekta: any;


// declare function setPublicKey(key: any): any;


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() user: User;
  payment: any;
  isLoading: boolean;
  accountTypes: SelectItem[];
  display = false;
  form: FormGroup;
  formSubmitted: boolean;
  selectedAccountType: string;
  enteredAccount: string;
  quantityToWithdraw: number;

    @ViewChild('cardInfo', { static: false }) cardInfo: ElementRef;

    stripe;
    loading = false;
    confirmation;

    card: any;
    cardHandler = this.onChange.bind(this);
    error: string;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private formError: FormErrorsService,
    private datePipe: DatePipe,
    private cd: ChangeDetectorRef,
    private stripeService: AngularStripeService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(urlParams => {
      console.log(urlParams);
      this.getUser(urlParams.userId);
    });

    this.accountTypes = [
      { label: 'Seleccionar Método de pago', value: null },
      { label: 'CLABE', value: 'CLABE' },
      { label: 'Tarjeta de débito', value: 'Tarjeta de débito' },
      { label: 'Número de cuenta', value: 'Número de cuenta' },
    ];

    this.form = this.fb.group({
      id: [],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]]
    });
  }

  showDialog() {
          console.log(Conekta.setPublicKey('key_KJysdbf6PotS2ut2'));
          this.display = true;
      }
  getUser(id: number): void {
    this.isLoading = true;
    this.userService.getElement(id).subscribe((response) => {
      this.user = response;
      this.user.products.forEach(e => {
        e.categoryName = e.category ? e.category.name : null;
        e.statusName = e.name === 'Camisa' ? 'Vendido' : 'Disponible';
        e.createdAtFormated = this.datePipe.transform(e.createdAt, 'dd-MM-yyyy');
        e.createdAt = new Date(e.createdAt);
      });
      this.form.patchValue({ ...this.user });
      this.isLoading = false;

    }, (err) => {
      console.error('User not found');
      this.isLoading = false;

    });
  }

  ngAfterViewInit(){
    this.stripeService.setPublishableKey('pk_test_2syov9fTMRwOxYG97AAXbOgt008X6NL46o').then(stripe => {
      this.stripe = stripe;
      const elements = stripe.elements();
      this.card = elements.create('card');
      this.card.mount(this.cardInfo.nativeElement);
      this.card.addEventListener('change', this.cardHandler);
});
  }

  goBack() {
    this.router.navigate(['..'], {
      relativeTo: this.activatedRoute
    });
  }

  withdraw() {
    Conekta.Token.create('',
      () => { console.log(''); },
      () => { console.error(''); });
    console.log('Retirar');
  }

  saveUser() {
    this.formSubmitted = true;
    console.log('guardando');
    const user = this.form.getRawValue();
    console.log(user);
    this.userService.save(user).subscribe(response => {
      console.log('se guardo correctamente');
    },
      err => {
        console.error(err);
      });
    console.log('Guardar Usuario', user);
    // mostrar modal
    this.router.navigate(['..'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        success: true
      }
    });
  }

  validateSubmit(e) {
    if (e.key === 'Enter') {
      this.saveUser();
    }
  }

  getErrorMessage(controlName) {
    console.log(controlName);
    console.log(this.formError.getErrorMessage(controlName));
    return this.formError.getErrorMessage(controlName);
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
      this.userService.buy({tokenId: token.id, productId: 1, userId: 1}).subscribe(res => 
        console.log(res));
    }
  }

  buyProduct(product: Product){
    this.userService.buy({productId: product.id, userId: 3 }).subscribe((response) => {
     console.log(response);
    });
  }
}