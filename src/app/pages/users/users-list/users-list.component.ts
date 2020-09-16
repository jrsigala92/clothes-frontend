import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/shared/interfaces/user';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: Array<any>;
  columns = [
    {title: 'Nombre', field: 'firstName'},
    {title: 'Apellido', field: 'lastName'},
    {title: 'Email', field: 'email'},
    {title: 'Phone', field: 'phone'},
    {title: 'Address', field: 'address'},
    {title: 'Email', field: 'email'},
  ]

  @Input() data: User[];
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAll().subscribe((response) =>{
      this.users = response;
      console.log(this.users);
    }, (err) =>{
      console.error(err);
    });
   }

  openUser(id:number){
     this.router.navigate([id], {
       relativeTo: this.activatedRoute
     });
   }
 
   handleUserSelect(user:User){
     this.router.navigate([user.id], {
       relativeTo: this.activatedRoute
     });
   }
}
