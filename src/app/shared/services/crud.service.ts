import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  protected apiUrl = environment.apiUrl;
  protected endpoint: string;
  constructor(protected httpService: HttpService) { }

  getAll(): Observable<any> {
    return this.httpService.get(this.apiUrl + this.endpoint);
  }

  getElement(id: number): Observable<any> {
    return this.httpService.get(this.apiUrl + this.endpoint +  `/${id}` );
  }

  insert(data: any): Observable<any> {
    return this.httpService.post(this.apiUrl + this.endpoint, data);
  } 

  save(data: any): Observable<any> {
    return this.httpService.put(this.apiUrl + this.endpoint, data);
  }

  delete(id: number): Observable<any> {
    return this.httpService.delete(this.apiUrl + this.endpoint + `/${id}`);
  }
}
