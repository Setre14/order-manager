import { Injectable } from '@angular/core';
import {Item, RestAction, RestAPI} from '../../../../shared/src';
import {CommunicationService} from './communication.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemsMap: Map<string, Item[]> = new Map<string, Item[]>();

  constructor(
    public comService: CommunicationService
  ) {
    this.loadItems();
  }

  loadItems() {
    this.comService.get<Item>(RestAPI.ITEM, RestAction.ALL).then(res => {
      this.itemsMap = new Map<string, Item[]>();
      res.forEach(item => {
        const i: Item = item;
        this.addItem(Item.create(item));
      });
    });
  }

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

  getItemsByType(type: string): Item[] {
    if (this.itemsMap.has(type)) {
      return this.itemsMap.get(type);
    }
    return null;
  }
}
