import { Component, OnInit, Input } from '@angular/core';
import { Classification } from 'src/app/shared/interfaces/classification';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClassificationService } from 'src/app/shared/services/classification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormErrorsService } from 'src/app/shared/services/form-errors.service';

@Component({
  selector: 'app-classification-form',
  templateUrl: './classification-form.component.html',
  styleUrls: ['./classification-form.component.css']
})
export class ClassificationFormComponent implements OnInit {
  @Input() classification: Classification;
  isLoading: boolean;
  form: FormGroup;
  formSubmitted: Boolean;

  constructor(
    private classificationsService: ClassificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private formError: FormErrorsService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(urlParams => {
      console.log(urlParams);
      this.getClassification(urlParams.classificationId);
    });

    this.form = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      description: ['']
    });
  }

  getClassification(id: number): void {
    this.isLoading = true;
    this.classificationsService.getElement(id).subscribe((response) => {
      this.classification = response;
      console.log(response);
      this.isLoading = false;
      this.form.patchValue({ ...this.classification });

    }, (err) => {
      console.error('Classification not found');
      this.isLoading = false;

    });

  }

  goBack() {
    this.router.navigate(['..'], {
      relativeTo: this.activatedRoute
    });
  }

  async saveClassification() {
    this.formSubmitted = true;
    const user = this.form.getRawValue();
    await this.classificationsService.save(user).subscribe(response => {
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
      this.saveClassification();
    }
  }

  getErrorMessage(controlName) {
    console.log(controlName);
    console.log(this.formError.getErrorMessage(controlName));
    return this.formError.getErrorMessage(controlName);
  }
}
