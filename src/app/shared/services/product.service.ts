import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends CrudService {
  protected endpoint = 'products';
  private products: Product[] = [];
}
