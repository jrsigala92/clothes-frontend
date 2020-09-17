import { Component, OnInit, Input } from '@angular/core';
import { Percentage } from 'src/app/shared/interfaces/percentage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PercentageService } from 'src/app/shared/services/percentage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormErrorsService } from 'src/app/shared/services/form-errors.service';

@Component({
  selector: 'app-percentage-form',
  templateUrl: './percentage-form.component.html',
  styleUrls: ['./percentage-form.component.css']
})
export class PercentageFormComponent implements OnInit {
  @Input() percentage: Percentage;
  isLoading: boolean;
  form: FormGroup;
  formSubmitted: Boolean;

  constructor(
    private percentagesService: PercentageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private formError: FormErrorsService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(urlParams => {
      console.log(urlParams);
      this.getPercentage(urlParams.percentageId);
    });

    this.form = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(6)]],
      quantity: ['']
    });
  }

  getPercentage(id: number): void {
    this.isLoading = true;
    this.percentagesService.getElement(id).subscribe((response) => {
      this.percentage = response;
      console.log(response);
      this.isLoading = false;
      this.form.patchValue({ ...this.percentage });

    }, (err) => {
      console.error('Percentage not found');
      this.isLoading = false;

    });

  }

  goBack() {
    this.router.navigate(['..'], {
      relativeTo: this.activatedRoute
    });
  }

  savePercentage() {
    this.formSubmitted = true;
    console.log('guardando');
    const user = this.form.getRawValue();
    console.log(user);
    this.percentagesService.save(user).subscribe(response => {
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
        success:true
      }
    });
  }
  validateSubmit(e) {
    if (e.key === 'Enter') {
      this.savePercentage();
    }
  }

  getErrorMessage(controlName) {
    console.log(controlName);
    console.log(this.formError.getErrorMessage(controlName));
    return this.formError.getErrorMessage(controlName);
  }
}
