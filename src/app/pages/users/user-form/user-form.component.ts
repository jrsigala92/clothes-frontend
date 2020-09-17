import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormErrorsService } from 'src/app/shared/services/form-errors.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() user: User;
  isLoading: boolean;
  // userData:User = {
  //   name:'',
  //   username:'',
  //   email:''
  // };
  form: FormGroup;
  formSubmitted: boolean;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private formError: FormErrorsService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(urlParams => {
      console.log(urlParams);
      this.getUser(urlParams.userId);
    });

    this.form = this.fb.group({
      id: [],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]]
    });
  }

  getUser(id: number): void {
    this.isLoading = true;
    this.userService.getElement(id).subscribe((response) => {
      this.user = response;
      
      this.form.patchValue({ ...this.user });
      console.log(this.user);
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

  saveUser() {
    this.formSubmitted = true;
    console.log('guardando');
    const user = this.form.getRawValue();
    console.log(user);
    this.userService.save(user).subscribe(response => {
      console.log('se guardo correctamente');
    },
      err => {
        console.error(err);
      });
    console.log('Guardar Usuario', user);
    // mostrar modal
    this.router.navigate(['..'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        success: true
      }
    });
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
