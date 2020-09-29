import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Classification } from '../interfaces/classification';

@Injectable({
  providedIn: 'root'
})
export class ClassificationService extends CrudService {
  protected endpoint = 'classifications';
  private categories: Classification[] = [];
}
