import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Size } from '../interfaces/size';

@Injectable({
  providedIn: 'root'
})
export class SizeService extends CrudService {
  protected endpoint = 'sizes';
  private sizes: Size[] = [];
}
