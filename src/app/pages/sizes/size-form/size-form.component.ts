import { Component, OnInit, Input } from '@angular/core';
import { Size } from 'src/app/shared/interfaces/size';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SizeService } from 'src/app/shared/services/size.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormErrorsService } from 'src/app/shared/services/form-errors.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-size-form',
  templateUrl: './size-form.component.html',
  styleUrls: ['./size-form.component.css']
})
export class SizeFormComponent implements OnInit {
  @Input() size: Size;
  isLoading: boolean;
  form: FormGroup;
  formSubmitted: Boolean;

  constructor(
    private sizesService: SizeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private formError: FormErrorsService,
    private messageService: MessageService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(urlParams => {
      console.log(urlParams);
      this.getSize(urlParams.sizeId);
    });

    this.form = this.fb.group({
      id: [''],
      name: ['', [Validators.required]]
    });
  }

  getSize(id: number): void {
    this.isLoading = true;
    this.sizesService.getElement(id).subscribe((response) => {
      this.size = response;
      console.log(response);
      this.isLoading = false;
      this.form.patchValue({ ...this.size });

    }, (err) => {
      console.error('Size not found');
      this.isLoading = false;

    });

  }

  goBack() {
    this.router.navigate(['..'], {
      relativeTo: this.activatedRoute
    });
  }

  async saveSize() {
    this.formSubmitted = true;
    const user = this.form.getRawValue();
    await this.sizesService.save(user).subscribe(response => {
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Talla guardada con exito'
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
          detail: err.message
        });
        console.error(err);
      });
    // mostrar modal

  }
  validateSubmit(e) {
    if (e.key === 'Enter') {
      this.saveSize();
    }
  }

  getErrorMessage(controlName) {
    console.log(controlName);
    console.log(this.formError.getErrorMessage(controlName));
    return this.formError.getErrorMessage(controlName);
  }
}
