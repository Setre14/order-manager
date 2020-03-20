import { Injectable } from '@angular/core';
import { Item, RestAction, RestAPI } from '../../../../shared';
import { CommunicationService } from './communication.service';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  items: Map<string, Item> = new Map<string, Item>();

  constructor(public comService: CommunicationService) {}

  async load() {
    await this.comService.get<Item>(RestAPI.ITEM, RestAction.ALL).then(res => {
      const items = new Map<string, Item>();
      res.forEach(item => {
        items.set(item._id, Item.fromJson(item));
      });
      this.items = items;
    });
  }

  getItems(): Item[] {
    return Array.from(this.items.values()).sort((a: Item, b: Item) =>
      a.name.localeCompare(b.name)
    );
  }

  getItem(id: string): Item {
    return this.items.get(id);
  }

  addItemToMap(item: Item): void {
    this.items.set(item._id, item);
  }

  addItem(item: Item): void {
    this.comService.post(RestAPI.ITEM, RestAction.INSERT, item);
    this.addItemToMap(item);
  }

  getItemsByType(typeId: string): Item[] {
    return this.getItems().filter(item => item.typeId == typeId);
  }

  toggleItem(item: Item): void {
    item.toggleActive();
    this.updateItem(item);
  }

  async updateItem(item: Item): Promise<void> {
    await this.comService.post(RestAPI.ITEM, RestAction.INSERT_OR_UPDATE, item);
  }

  disable(item: Item): void {
    this.items.delete(item._id);
    this.comService.post(RestAPI.ITEM, RestAction.DISABLE, item);
  }

  disableType(typeId: string): void {
    this.getItems().forEach(item => {
      if (item.typeId == typeId) {
        this.items.delete(item._id);
      }
    });
    this.comService.post(RestAPI.ITEM, RestAction.DISABLE, { type: typeId });
  }

  async disableAll(): Promise<void> {
    this.items = new Map<string, Item>();
    await this.comService.get(RestAPI.ITEM, RestAction.DISABLE_ALL);
  }
}
