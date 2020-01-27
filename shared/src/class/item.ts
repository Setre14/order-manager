import {Station} from './station';

export class Item {
  name: string;
  price: number;
  type: string;
  station: Station | undefined;
  active: boolean;

  constructor(name: string, type: string, price: number, station: Station | undefined = undefined, active: boolean = true) {
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

  setActive(active): void{
    this.active = active;
  }

  toggleActive(): boolean {
    this.active = ! this.active;
    return this.active;
  }

  static create(item: Item) {
    return new Item(item.name, item.type, item.price, item.station, item.active);
  }
}
