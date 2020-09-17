import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Percentage } from '../interfaces/percentage';

@Injectable({
  providedIn: 'root'
})
export class PercentageService extends CrudService {
  protected endpoint = 'percentages';
  private percentages: Percentage[] = [];
}
