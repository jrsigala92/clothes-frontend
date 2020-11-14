import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/shared/services/authentication.service';
import { CanActivateViaAuthGuardGuard } from 'src/app/can-activate-via-auth-guard.guard';
import { SharedService } from 'src/app/shared/services/shared-service';
import { ShoppingCartElemService } from 'src/app/shared/services/shopping-cart-elem.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  loggedUserName:string;
  shoppingCartElements:number;

  loggedUser: string;
  constructor(
    private autService: AuthenticationService,
    private router: Router,    
    public guard: CanActivateViaAuthGuardGuard,
    private sharedService: SharedService,
    private shoppingCartService: ShoppingCartElemService
  ) { }
  logged: boolean = false;
  ngOnInit(): void {
    this.sharedService.sharedMessage.subscribe(message => this.loggedUserName = message);
    this.sharedService.sharedShoppingCartElems.subscribe(message => this.shoppingCartElements = message);

    if (!this.guard.canActivate()){
        this.router.navigate(['welcome']);
      }
      else{
        this.newLoggedUser(this.autService.getToken());
        this.shoppingCartService.getAllFilteredById(9).subscribe(res => {
          this.getShoppingCartElements(res.length);
        });
        
        this.shoppingCartElements;
        this.logged = true;
      }
  }
  logout(){
    localStorage.removeItem('token');
  }
  
  handleShoppingCartElem(elem: number){
    console.log('event emmited');
    console.log(elem);
  }

  newLoggedUser(name) {
    this.sharedService.loggedUserName(name);
  }

  getShoppingCartElements(elementsNumber) {
    this.sharedService.shoppingCartElements(elementsNumber);
  }
}
