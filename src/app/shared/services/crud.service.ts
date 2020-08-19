import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private apiUrl:string = 'http://localhost:3000/';
  protected endpoint:string;
  constructor(private httpService:HttpService) { }

  getAll():Observable<any> {
    return this.httpService.get(this.apiUrl + this.endpoint);
  }

  getElement(id:number):Observable<any> {
    return this.httpService.get(this.apiUrl + this.endpoint);
  }

  insert(data:any):Observable<any> {
    return this.httpService.post(this.apiUrl + this.endpoint, data);
  }

  save(data:any):Observable<any> {
    return this.httpService.put(this.apiUrl, this.endpoint);
  }
}
