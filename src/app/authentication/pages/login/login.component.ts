import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService, Credentials } from '../../shared/services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  error = false;
  errorMessage;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: '', // ['',['', Validators.required, Validators.email]],
      password: '', // ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  login(){
    alert('login');
    if (this.form.invalid) { return; }
    const credentials: Credentials = this.form.getRawValue();
    this.loginService.login(credentials).subscribe(response => {
        // this.error = false;
        // this.authService.saveToken(response.token);
        // console.log('credenciales correctas');
        if (response.token){
          this.error = false;
          console.log(response.token)
          this.authService.saveToken(response.token);
          this.router.navigate(['./users'],
          {
              queryParams:
                response.token
            });
        }
        else {
          this.error = true;
          this.errorMessage = response.error;
        }
      }, err => {
        this.error = true;
        console.log('credenciales incorrectas', err);
      });
  }
}
