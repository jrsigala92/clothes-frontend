import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private name = new BehaviorSubject('First Message');
  private elementsNum = new BehaviorSubject(0);
  sharedMessage = this.name.asObservable();
  sharedShoppingCartElems = this.elementsNum.asObservable();

  constructor() { }

  loggedUserName(name: string) {
    this.name.next(name)
  }
  l
  shoppingCartElements(elementsNo: number) {
    this.elementsNum.next(elementsNo);
  }
}
