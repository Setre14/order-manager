import { Station } from './station';
import { DBElem } from './dbElem';

export class Item extends DBElem {
  name: string;
  price: number;
  typeId: string;
  stationId: Station | undefined;
  active: boolean;

  constructor(
    name: string,
    type: string,
    price: number,
    station: Station | undefined = undefined,
    active: boolean = true
  ) {
    super();
    this.name = name;
    this.price = price;
    this.typeId = type;
    this.stationId = station;
    this.active = active;
  }

  isType(typeId: string) {
    return this.typeId === typeId;
  }

  isActive(): boolean {
    return this.active;
  }

  setActive(active: boolean): void {
    this.active = active;
  }

  toggleActive(): boolean {
    this.active = !this.active;
    return this.active;
  }

  equals(item: Item): boolean {
    return this.name == item.name && this.typeId == item.typeId;
  }

  static fromJson(obj: Item): Item {
    const item = new Item(
      obj.name,
      obj.typeId,
      obj.price,
      obj.stationId,
      obj.active
    );
    item._id = obj._id;
    item.disabled = obj.disabled;

    return item;
  }
}
