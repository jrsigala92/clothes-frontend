import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/shared/interfaces/user';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: Array<any>;
  columns = [
    { title: 'Nombre', field: 'firstName' },
    { title: 'Apellido', field: 'lastName' },
    { title: 'Email', field: 'email' },
    { title: 'Teléfono', field: 'phone' },
    { title: 'Dirección', field: 'address' },
    { title: 'Activo', field: 'active' },
  ]

  @Input() data: User[];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAll().subscribe((response) => {
      this.users = response;
      console.log(this.users);
    }, (err) => {
      console.error(err);
    });
  }

  openUser(id: number) {
    this.router.navigate([id], {
      relativeTo: this.activatedRoute
    });
  }

  handleUserSelect(user: User) {
    this.router.navigate([user.id], {
      relativeTo: this.activatedRoute
    });
  }

  async handleUserDelete(user: User) {
    await this.userService.delete(user.id).subscribe((response) => {
      console.log(response);
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Usuario eliminado con éxito'
      });
      this.userService.getAll().subscribe((x) => {
        this.users = x;
      });
    }, (err) => {

      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: err
      });
      console.error(err);
    });
  }
}
