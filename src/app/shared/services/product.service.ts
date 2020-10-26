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
  
  buyWithStripe(data: any): Observable<any> {
    console.log(data);
    // return this.httpService.post(this.apiUrl + this.endpoint + '/buy', data);
    return this.httpService.post(this.apiUrl + this.endpoint + '/buyWithStripe', data);
  }

  uploadImages(data: any[], id: number){
    // console.log(this.httpService.post(this.apiUrl + 'files' + '/uploadMultipleFiles', data));
    console.log(data);

    return this.httpService.postImages(this.apiUrl + 'files' + '/uploadMultipleFiles', data);
  }
}
