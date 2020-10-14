import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  loggedUser: string;
  constructor() { }

  ngOnInit(): void {
    this.loggedUser = localStorage.getItem('token');
    console.log(this.loggedUser);
  }
  logout(){
    localStorage.removeItem('token');
  }

}
