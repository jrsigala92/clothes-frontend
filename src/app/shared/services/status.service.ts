import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Status } from '../interfaces/status';

@Injectable({
  providedIn: 'root'
})
export class StatusService extends CrudService {
  protected endpoint = 'statuses';
  private categories: Status[] = [];
}
