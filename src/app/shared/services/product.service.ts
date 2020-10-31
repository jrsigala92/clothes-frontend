import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

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

  getImage(name: string){
    // const params = new HttpParams().set('name', name);
    return this.httpService.getWithParamsObject(this.apiUrl + 'files' +`/${name}`);
  }

  buyWithStripe(data: any): Observable<any> {
    console.log(data);
    // return this.httpService.post(this.apiUrl + this.endpoint + '/buy', data);
    return this.httpService.post(this.apiUrl + this.endpoint + '/buyWithStripe', data);
  }

  uploadImages(data: any[], id: number){
    return this.httpService.postImages(this.apiUrl + 'files' + '/uploadMultipleFiles', data, id.toString());
  }
}
