import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/shared/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private autService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    // if (!this.autService.isLoggedIn()){
    //   this.router.navigate(['auth/login']);
    // }
  }
}
