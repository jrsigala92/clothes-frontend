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
import { ProductService } from 'src/app/shared/services/product.service';
import { Status } from 'src/app/shared/interfaces/status';
import { Classification } from 'src/app/shared/interfaces/classification';
import { Size } from 'src/app/shared/interfaces/size';
import { Category } from 'src/app/shared/interfaces/category';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ClassificationService } from 'src/app/shared/services/classification.service';
import { SizeService } from 'src/app/shared/services/size.service';
import { StatusService } from 'src/app/shared/services/status.service';
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
  displayProduct = false;
  form: FormGroup;
  formSubmitted: boolean;
  selectedAccountType: string;
  enteredAccount: string;
  quantityToWithdraw: number;
  userId:number;

  // products
  productForm: FormGroup;
  categories: Category[];
  statuses: Status[];
  classifications: Classification[];
  sizes: Size[];

  constructor(
    private productsService: ProductService,
    private userService: UserService,
    private categoriesService: CategoryService,
    private classificationsService: ClassificationService,
    private sizesService: SizeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private formError: FormErrorsService,
    private datePipe: DatePipe,
    private messageService: MessageService,
    private productService: ProductService,
    private statusService: StatusService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(urlParams => {
      this.userId = urlParams.userId;
      this.getUser(this.userId);
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
    
  this.productForm = this.fb.group({
    id: [''],
    name: ['', [Validators.required]],
    description: [''],
    sizeID: ['', [Validators.required]],
    categoryID: ['', [Validators.required]],
    classificationID: ['', [Validators.required]],
    statusID: ['', [Validators.required]],
    price: ['']
  });
  }

  showDialog() {
    this.display = true;
  }
  getUser(id: number): void {
    this.isLoading = true;
    this.userService.getElement(id).subscribe((response) => {
      this.user = response;
      this.user?.products.forEach(async e => {
        e.categoryName = e.category ? e.category.name : null;
        await this.productService.getElement(e.id).subscribe(r =>
          e.statusName = r.status ? r.status.name : null);
        // e.statusName = e.status ? e.status.name : null;
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
      
      this.getUser(this.userId);
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
  displayDialog(){
    this.getCategories();
    this.getClassifications();
    this.getSizes();
    this.getStatuses();
    this.displayProduct = true;
  }

  // 
  // product section
  
  defaultDropdownCategory: Category = { id: 0, name: 'Seleccionar Categoría' };
  defaultDropdownUser: User = { id: 0, email: 'Seleccionar Usuario' };
  defaultDropdownClassification: Classification = { id: 0, name: 'Seleccionar Clasificación' };
  defaultDropdownSize: Size = { id: 0, name: 'Seleccionar Talla' };
  defaultDropdownStatus: Status = { id: 0, name: 'Seleccionar Status', description: 'description' };
  
  async getCategories() {
    this.categoriesService.getAll().subscribe(response => {
      this.categories = response;
      this.categories.unshift(this.defaultDropdownCategory);
      console.log(this.categories);
    }, (err) => {
      console.error(err);
    });
  }

  async getStatuses() {
    this.statusService.getAll().subscribe(response => {
      this.statuses = response;
      this.statuses.unshift(this.defaultDropdownStatus);
    }, (err) => {
      console.error(err);
    });
  }

  async getClassifications() {
    this.classificationsService.getAll().subscribe(response => {
      this.classifications = response;
      this.classifications.unshift(this.defaultDropdownClassification);
    }, (err) => {
      console.error(err);
    });
  }

  async getSizes() {
    this.sizesService.getAll().subscribe(response => {
      this.sizes = response;
      this.sizes.unshift(this.defaultDropdownSize);
    }, (err) => {
      console.error(err);
    });
  }

  saveProduct() {
    this.formSubmitted = true;
    console.log('guardando');
    const user = this.productForm.getRawValue();
    user.userID = {id: this.userId, name:''};
    user.displayInShop = true;
    console.log(user);
    this.productsService.save(user).subscribe(response => {
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Producto agregado con éxito'
      });
      this.getUser(this.userId);
      this.displayProduct = false;
    },
      err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err
        });
        // console.error(err);
      });
    console.log('Guardar Usuario', user);
    // mostrar modal

  }
}