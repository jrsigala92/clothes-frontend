import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { ShoppingCartElem } from '../interfaces/shopping-cart-elem';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartElemService extends CrudService {
  protected endpoint = 'shopping-cart';
  private shoppingCartElems: ShoppingCartElem[] = [];

  getAllFilteredById(id): Observable<any>{
    return this.httpService.get(this.apiUrl + this.endpoint);
  }
}
