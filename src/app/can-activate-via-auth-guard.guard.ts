import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication/shared/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateViaAuthGuardGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) { }

    canActivate() {
        // If the user is not logged in we'll send them back to the home page
        // if (!this.authService.isLoggedIn()) {
        //     console.log('No estás logueado');
        //     this.router.navigate(['/']);
        //     return false;
        // }

        return true;
    }
  
}
