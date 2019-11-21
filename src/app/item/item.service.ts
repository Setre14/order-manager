import { Injectable } from '@angular/core';
import {Item} from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  items: Item[] = [];

  constructor() {  }

  getItem(desc: string): Item {
    for (const item of this.items) {
      if (item.name === desc) {
        return item;
      }
    }
    return null;
  }

  addItem(item: Item): void {
    this.items.push(item);
  }
}
