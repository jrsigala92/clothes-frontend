import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Product } from '../interfaces/product';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends CrudService {
  protected endpoint = 'categories';
  private categories: Category[] = [];
}
