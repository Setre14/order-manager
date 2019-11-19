import { Injectable } from '@angular/core';
import {Item} from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  items: Item[];

  constructor() {
    this.items.push(
      new Item('item1', 4.6),
      new Item('item2', 4.6),
      new Item('item3', 4.6)
    );
  }
}
