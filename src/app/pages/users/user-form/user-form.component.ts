import { Component, OnInit, Input, ChangeDetectorRef, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { User } from '../../../shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { FormErrorsService } from 'src/app/shared/services/form-errors.service';
import { DatePipe } from '@angular/common';
import { MessageService, SelectItem } from 'primeng/api';
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
export class UserFormComponent implements OnInit {
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

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private formError: FormErrorsService,
    private datePipe: DatePipe,
    private messageService: MessageService) {
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
      address: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  showDialog() {
    this.display = true;
  }
  getUser(id: number): void {
    this.isLoading = true;
    this.userService.getElement(id).subscribe((response) => {
      this.user = response;
      this.user?.products.forEach(e => {
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
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Usuario agregado con éxito'
      });
      this.router.navigate(['..'], {
        relativeTo: this.activatedRoute,
        queryParams: {
          success: true
        }
      });
    },
      err => {        
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err
        });
      });
    // mostrar modal
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
}