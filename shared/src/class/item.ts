import { Station } from './station';
import { DBElem } from './dbElem';

export class Item extends DBElem {
  name: string;
  price: number;
  type: string;
  station: Station | undefined;
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
    this.type = type;
    this.station = station;
    this.active = active;
  }

  isType(type: string) {
    return this.type === type;
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
    return this.name == item.name && this.type == item.type;
  }

  static fromJson(obj: Item): Item {
    const item = new Item(
      obj.name,
      obj.type,
      obj.price,
      obj.station,
      obj.active
    );
    item._id = obj._id;
    item.disabled = obj.disabled;

    return item;
  }
}
