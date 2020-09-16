import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import {SignupService} from './../../shared/services/signup.service';
import { FormErrorsService } from 'src/app/shared/services/form-errors.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  name: string;
  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formError: FormErrorsService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validators: this.matchPasswords.bind(this)
    });
  }

  passwordStrength() {
    return null;
  }

  matchPasswords() {
    if (!this.form)  {return; }

    const datos = this.form.getRawValue();
    if (datos.password === datos.confirmPassword) {
      return null;
    }
    return {
      missmatch: true
    };
  }

  signup() {
    if (this.form.valid) {
      const datos = this.form.getRawValue();
      this.signupService.signup(datos).subscribe( response => {
        this.router.navigate(['../login'], {
          relativeTo: this.activatedRoute,
          queryParams: {
            created: true
          }
        });
      }, err => {
        console.error('Failed to signup');
      });
    }
    console.error('fallo');
  }
  
  getErrorMessage(controlName) {
    console.log(controlName);
    console.log(this.formError.getErrorMessage(controlName));
    return this.formError.getErrorMessage(controlName);
  }

}
