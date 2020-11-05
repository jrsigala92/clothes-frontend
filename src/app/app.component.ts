import { Component, Input } from '@angular/core';
import { ShoppingCartElem } from './shared/interfaces/shopping-cart-elem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clothes-app';
  @Input() shoppingCart: ShoppingCartElem[];

  handleShoppingCartElem(elem: number){
    console.log('event emmited');
    console.log(elem);
  }
}
