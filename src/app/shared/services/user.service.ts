import { Injectable } from '@angular/core';
import {User} from './../../shared/interfaces/user';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { CrudService } from './crud.service';


@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService {
  protected endpoint: string = 'users';
  private users: User[] =[];
}
