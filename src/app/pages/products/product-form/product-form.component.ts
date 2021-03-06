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
import { Classification } from 'src/app/shared/interfaces/classification';
import { ClassificationService } from 'src/app/shared/services/classification.service';
import { SizeService } from 'src/app/shared/services/size.service';
import { Size } from 'src/app/shared/interfaces/size';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { StatusService } from 'src/app/shared/services/status.service';
import { Status } from 'src/app/shared/interfaces/status';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})

export class ProductFormComponent implements OnInit {
  @Input() product: Product;
  categories: Category[];
  statuses: Status[];
  users: User[];
  classifications: Classification[];
  sizes: Size[];
  selectedFiles: any[];
  images: any[] = [];

  form: FormGroup;
  formSubmitted: boolean;
  isLoading: boolean;
  defaultDropdownCategory: Category = { id: 0, name: 'Seleccionar Categoría' };
  defaultDropdownUser: User = { id: 0, email: 'Seleccionar Usuario' };
  defaultDropdownClassification: Classification = { id: 0, name: 'Seleccionar Clasificación' };
  defaultDropdownSize: Size = { id: 0, name: 'Seleccionar Talla' };
  defaultDropdownStatus: Status = { id: 0, name: 'Seleccionar Status', description: 'description' };

  constructor(
    private productsService: ProductService,
    private categoriesService: CategoryService,
    private classificationsService: ClassificationService,
    private sizesService: SizeService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private formError: FormErrorsService,
    private sanitizer: DomSanitizer,
    private messageService: MessageService,
    private statusService: StatusService) {
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
      sizeID: ['', [Validators.required]],
      categoryID: ['', [Validators.required]],
      classificationID: ['', [Validators.required]],
      statusID: ['', [Validators.required]],
      userID: ['', [Validators.required]],
      price: ['']
    });
  }

  async getProduct(id: number) {
    this.isLoading = true;
    this.getCategories();
    this.getUsers();
    this.getClassifications();
    this.getSizes();
    this.getStatuses();

    await this.productsService.getElement(id).subscribe((response) => {
      this.product = response;
      this.isLoading = false;
      this.form.patchValue({ ...this.product });

      this.form.controls.categoryID.setValue(this.product.category);
      this.form.controls.userID.setValue(this.product.user);
      this.form.controls.classificationID.setValue(this.product.classification);
      this.form.controls.sizeID.setValue(this.product.size);
      this.form.controls.statusID.setValue(this.product.status);
      this.product.files.forEach(img => {
        // this.images.push(this.productsService.getImage(img.name));
        this.productsService.getImage(img.name).subscribe(imgresponse => {
          console.log(imgresponse);
          let objectUrl = URL.createObjectURL(imgresponse);
          this.images.push(this.sanitizer.bypassSecurityTrustUrl(objectUrl));
        }, 
        error=>{
          console.log(error);
        });
      });
      console.log(this.product.files);
      console.log(this.images);
    }, (err) => {
      console.error('Product not found');
      this.isLoading = false;

    });
  }

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

  async getUsers() {
    this.userService.getAll().subscribe(response => {
      this.users = response;
      this.users.unshift(this.defaultDropdownUser);
      console.log(this.users);
    }, (err) => {
      console.error(err);
    });
  }

  goBack() {
    this.router.navigate(['..'], {
      relativeTo: this.activatedRoute
    });
  }

  selectedImages(e) {
    this.selectedFiles = e.target.files;
  }

  async uploadImages() {
    await this.iterateThroughFiles();
  }

  async iterateThroughFiles() {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.productsService.uploadImages(this.selectedFiles[i], this.product.id).subscribe(res => {
        console.log(res);
      },
        error => {
          console.log(error);
        });
    }
  }

  saveProduct() {
    this.formSubmitted = true;
    console.log('guardando');
    const user = this.form.getRawValue();
    user.displayInShop = true;
    console.log(user);
    this.productsService.save(user).subscribe(response => {
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Producto agregado con éxito'
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
        // console.error(err);
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
