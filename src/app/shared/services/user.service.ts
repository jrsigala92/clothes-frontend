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

  buy(data: any): Observable<any> {
    console.log(data);
    // return this.httpService.post(this.apiUrl + this.endpoint + '/buy', data);
    return this.httpService.post(this.apiUrl + 'products' + '/buy', data);

  }
}
