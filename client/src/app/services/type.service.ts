import { Injectable } from '@angular/core';
import { CommunicationService } from './communication.service';
import { RestAPI, RestAction, ItemType } from '../../../../shared';
import { ItemService } from './item.service';
import { StorableService } from './storable.service';

@Injectable({
  providedIn: 'root',
})
export class TypeService extends StorableService<ItemType> {
  restAPI = RestAPI.TYPE;
  conversion = ItemType.fromJson;

  elements: Map<string, ItemType> = new Map<string, ItemType>();

  constructor(
    protected comService: CommunicationService,
    private itemService: ItemService
  ) {
    super(comService);
  }

  getType(typeId: string): ItemType {
    return this.elements.get(typeId);
  }

  getTypes(): ItemType[] {
    const itemTypes = Array.from(this.elements.values());

    if (!itemTypes) {
      return [];
    }

    return itemTypes.sort((a: ItemType, b: ItemType) =>
      a.name.localeCompare(b.name)
    );
  }

  hasType(type: string): boolean {
    let exists = false;

    this.getTypes().forEach(t => {
      if (t.name == type) {
        exists = true;
      }
    });

    return exists;
  }

  addType(t: string): ItemType {
    let type: ItemType;
    if (!this.hasType(t)) {
      type = new ItemType(t);
      this.elements.set(type._id, type);
      this.dbInsert(type);
    } else {
      this.getTypes().forEach(ty => {
        if (t == ty.name) {
          type = ty;
        }
      });
    }

    return type;
  }

  disable(id: string): void {
    this.itemService.disableType(id);
    this.elements.delete(id);
    this.dbDisableId(id);
  }

  async disableAll(): Promise<void> {
    await this.itemService.disableAll();
    this.elements = new Map<string, ItemType>();
    await this.dbDdisableAll();
  }
}
