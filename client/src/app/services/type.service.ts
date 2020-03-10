import { Injectable } from '@angular/core';
import { CommunicationService } from './communication.service';
import { RestAPI, RestAction, ItemType } from '../../../../shared';
import { ItemService } from './item.service';

@Injectable({
  providedIn: 'root',
})
export class TypeService {
  private types: Map<string, ItemType> = new Map<string, ItemType>();

  constructor(
    private comService: CommunicationService,
    private itemService: ItemService
  ) {}

  getType(typeId: string): ItemType {
    return this.types.get(typeId);
  }

  getTypes(): ItemType[] {
    return Array.from(this.types.values()).sort((a: ItemType, b: ItemType) =>
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
      this.types.set(type._id, type);
      this.comService.post(RestAPI.TYPE, RestAction.INSERT, type);
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
    this.types.delete(id);
    this.comService.post(RestAPI.TYPE, RestAction.DISABLE, { _id: id });
  }

  async disableAll(): Promise<void> {
    await this.itemService.disableAll();
    this.types = new Map<string, ItemType>();
    await this.comService.get(RestAPI.TYPE, RestAction.DISABLE_ALL);
  }

  async load(): Promise<void> {
    await this.comService
      .get<ItemType>(RestAPI.TYPE, RestAction.ALL)
      .then(res => {
        const types = new Map<string, ItemType>();
        res.forEach(r => {
          types.set(r._id, r);
        });
        this.types = types;
      });
  }
}
