import { Injectable } from '@angular/core';
import {Item} from '../../../../shared/src';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemsMap: Map<string, Item[]> = new Map<string, Item[]>();

  constructor() {  }

  getItem(desc: string): Item {
    for (const itemArray of this.itemsMap.values()) {
      for (const item of itemArray) {
        if (item.name === desc) {
          return item;
        }
      }
    }
    return null;
  }

  addItem(item: Item): void {
    const type  = item.type;
    if (this.itemsMap.has(type)) {
      this.itemsMap.get(type).push(item);
    } else {
      this.itemsMap.set(type, [item]);
    }
  }

  getTypes(): string[] {
    return Array.from(this.itemsMap.keys());
  }

  getItems(type: string): Item[] {
    if (this.itemsMap.has(type)) {
      return this.itemsMap.get(type);
    }
    return null;
  }
}
