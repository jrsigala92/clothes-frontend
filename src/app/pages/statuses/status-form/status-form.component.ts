import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Status } from 'src/app/shared/interfaces/status';
import { FormErrorsService } from 'src/app/shared/services/form-errors.service';
import { StatusService } from 'src/app/shared/services/status.service';

@Component({
  selector: 'app-status-form',
  templateUrl: './status-form.component.html',
  styleUrls: ['./status-form.component.css']
})
export class StatusFormComponent implements OnInit {
  @Input() status: Status;
  isLoading: boolean;
  form: FormGroup;
  formSubmitted: Boolean;

  constructor(
    private statusesService: StatusService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private formError: FormErrorsService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(urlParams => {
      console.log(urlParams);
      this.getStatus(urlParams.statusId);
    });

    this.form = this.fb.group({
      // id:[''],
      name: ['', [Validators.required]],
      description: ['']
    });
  }

  getStatus(id: number): void {
    this.isLoading = true;
    this.statusesService.getElement(id).subscribe((response) => {
      this.status = response;
      console.log(response);
      this.isLoading = false;
      this.form.patchValue({ ...this.status });

    }, (err) => {
      console.error('Status not found');
      this.isLoading = false;

    });

  }

  goBack() {
    this.router.navigate(['..'], {
      relativeTo: this.activatedRoute
    });
  }

  saveStatus() {
    this.formSubmitted = true;
    console.log('guardando');
    const user = this.form.getRawValue();
    console.log(user);
    this.statusesService.save(user).subscribe(response => {
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
      this.saveStatus();
    }
  }

  getErrorMessage(controlName) {
    console.log(controlName);
    console.log(this.formError.getErrorMessage(controlName));
    return this.formError.getErrorMessage(controlName);
  }
}
