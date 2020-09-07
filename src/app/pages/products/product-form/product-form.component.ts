import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormErrorsService } from 'src/app/shared/services/form-errors.service';
import { Product } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})

export class ProductFormComponent implements OnInit {
  @Input() product: Product;
  form: FormGroup;
  formSubmitted: Boolean;
  isLoading: boolean;

  constructor(
    private productsService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private formError: FormErrorsService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(urlParams => {
      console.log(urlParams);
      this.getProduct(urlParams.productId);
    })

    this.form = this.fb.group({
      id: ['id'],
      name: ['name', [Validators.required, Validators.minLength(6)]],
      description: ['description', [Validators.required, Validators.minLength(6)]]
    });
  }

  getProduct(id: number): void {
    this.isLoading = true;
    this.productsService.getElement(id).subscribe((response) => {
      this.product = response;
      this.isLoading = false;
      console.log(response);
    }, (err) => {
      console.error('Product not found');
      this.isLoading = false;

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
      console.log('se guardo correctamente');
    },
      err => {
        console.error(err);
      });
    console.log("Guardar Usuario", user);
    // mostrar modal
    this.router.navigate(['..'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        success: true
      }
    });
  }

  getErrorMessage(controlName) {
    console.log(controlName);
    console.log(this.formError.getErrorMessage(controlName));
    return this.formError.getErrorMessage(controlName);
  }
}