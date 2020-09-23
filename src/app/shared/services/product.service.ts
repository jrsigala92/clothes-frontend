import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends CrudService {
  protected endpoint = 'products';
  private products: Product[] = [];

  buy(data: any): Observable<any> {
    console.log(data);
    return this.httpService.post(this.apiUrl + this.endpoint + '/buy', data);
  }
}
