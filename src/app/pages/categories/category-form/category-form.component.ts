import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/shared/interfaces/category';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormErrorsService } from 'src/app/shared/services/form-errors.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  @Input() category: Category;
  isLoading: boolean;
  form: FormGroup;
  formSubmitted: Boolean;

  constructor(
    private categoriesService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private formError: FormErrorsService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(urlParams => {
      console.log(urlParams);
      this.getCategory(urlParams.categoryId);
    });

    this.form = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  getCategory(id: number): void {
    this.isLoading = true;
    this.categoriesService.getElement(id).subscribe((response) => {
      this.category = response;
      console.log(response);
      this.isLoading = false;
      this.form.patchValue({ ...this.category });

    }, (err) => {
      console.error('Category not found');
      this.isLoading = false;

    });

  }

  goBack() {
    this.router.navigate(['..'], {
      relativeTo: this.activatedRoute
    });
  }

  async saveCategory() {
    this.formSubmitted = true;
    const user = this.form.getRawValue();
    await this.categoriesService.save(user).subscribe(response => {
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
    // mostrar modal

  }
  validateSubmit(e) {
    if (e.key === 'Enter') {
      this.saveCategory();
    }
  }

  getErrorMessage(controlName) {
    console.log(controlName);
    console.log(this.formError.getErrorMessage(controlName));
    return this.formError.getErrorMessage(controlName);
  }
}
