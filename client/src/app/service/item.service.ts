import { Injectable } from '@angular/core';
import {Item, RestAction, RestAPI} from '../../../../shared';
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
        this.addItemToMap(Item.create(item));
      });
    });
  }

  getItems(): Item[] {
    const items: Item[] = [];

    Array.from(this.itemsMap.values()).forEach(i => items.push(...i))

    return items.sort((a: Item, b: Item) => a.name.localeCompare(b.name));
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

  addItemToMap(item: Item): void {
    const type  = item.type;
    if (this.itemsMap.has(type)) {
      this.itemsMap.get(type).push(item);
    } else {
      this.itemsMap.set(type, [item]);
    }
  }

  addItem(item: Item): void {
    this.comService.post(RestAPI.ITEM, RestAction.INSERT, item);
    this.addItemToMap(item);
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
