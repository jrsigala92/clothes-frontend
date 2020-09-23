import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormErrorsService } from 'src/app/shared/services/form-errors.service';
import { Product } from 'src/app/shared/interfaces/product';
import { CategoryService } from 'src/app/shared/services/category.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Category } from 'src/app/shared/interfaces/category';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})

export class ProductFormComponent implements OnInit {
  @Input() product: Product;
  categories: Category[];
  users: User[];

  form: FormGroup;
  formSubmitted: boolean;
  isLoading: boolean;
  defaultDropdownCategory: Category = {id: 0, name: 'Seleccionar'};
  defaultDropdownUser: User = {id: 0, email: 'Seleccionar'};
  constructor(
    private productsService: ProductService,
    private categoriesService: CategoryService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private formError: FormErrorsService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(urlParams => {
      console.log(urlParams);
      this.getProduct(urlParams.productId);
    });

    this.form = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      description: [''],
      categoryID: ['', [Validators.required]],
      userID: ['', [Validators.required]],
      price: ['']
    });
  }

  async getProduct(id: number) {
    this.isLoading = true;
    await this.getCategories();
    await this.getUsers();
    this.productsService.getElement(id).subscribe((response) => {
      this.product = response;
      this.isLoading = false;
      this.form.patchValue({ ...this.product });

      this.form.controls['categoryID'].setValue(this.product.category);
      this.form.controls['userID'].setValue(this.product.user);
    }, (err) => {
      console.error('Product not found');
      this.isLoading = false;

    });
  }

  async getCategories(){
    this.categoriesService.getAll().subscribe(response => {
      this.categories = response;
      this.categories.unshift(this.defaultDropdownCategory);
      console.log(this.categories);
    }, (err) =>{
      console.error(err);
    });
  }

  async getUsers(){
    this.userService.getAll().subscribe(response => {
      this.users = response;
      this.users.unshift(this.defaultDropdownUser);
      console.log(this.users);
    }, (err) =>{
      console.error(err);
    });
  }

  goBack() {
    this.router.navigate(['..'], {
      relativeTo: this.activatedRoute
    });
  }

  saveProduct() {
    this.formSubmitted = true;
    console.log('guardando');
    const user = this.form.getRawValue();
    console.log(user);
    this.productsService.save(user).subscribe(response => {
      this.router.navigate(['..'], {
        relativeTo: this.activatedRoute,
        queryParams: {
          success: true
        }
      });
    },
      err => {
        console.error(err);
      });
    console.log('Guardar Usuario', user);
    // mostrar modal

  }

  getErrorMessage(controlName) {
    console.log(controlName);
    console.log(this.formError.getErrorMessage(controlName));
    return this.formError.getErrorMessage(controlName);
  }
}