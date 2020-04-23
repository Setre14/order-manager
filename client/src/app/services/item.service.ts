import { Injectable } from '@angular/core';
import { Item, RestAction, RestAPI } from '../../../../shared';
import { CommunicationService } from './communication.service';
import { StorableService } from './storable.service';

@Injectable({
  providedIn: 'root',
})
export class ItemService extends StorableService<Item> {
  restAPI = RestAPI.ITEM;
  conversion = Item.fromJson;

  elements: Map<string, Item> = new Map<string, Item>();

  constructor(protected comService: CommunicationService) {
    super(comService);
  }

  getItems(): Item[] {
    return Array.from(this.elements.values()).sort((a: Item, b: Item) =>
      a.name.localeCompare(b.name)
    );
  }

  getItem(id: string): Item {
    return this.elements.get(id);
  }

  addItemToMap(item: Item): void {
    this.elements.set(item._id, item);
  }

  addItem(item: Item): void {
    this.dbInsert(item);
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
    await this.dbUpdate(item);
  }

  disable(item: Item): void {
    this.elements.delete(item._id);
    this.dbDisable(item);
  }

  disableType(typeId: string): void {
    this.getItems().forEach(item => {
      if (item.typeId == typeId) {
        this.elements.delete(item._id);
      }
    });
    this.dbDisable({ type: typeId });
  }

  async disableAll(): Promise<void> {
    this.elements = new Map<string, Item>();
    await this.dbDdisableAll();
  }
}
