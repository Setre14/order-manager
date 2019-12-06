import {Station} from './station';

export class Item {
  name: string;
  price: number;
  type: string;
  station: Station | undefined;

  constructor(name: string, type: string, price: number, station: Station | undefined = undefined) {
    this.name = name;
    this.price = price;
    this.type = type;
    this.station = station;
  }

  isType(type: string) {
    return this.type === type;
  }

  static create(item: Item) {
    return new Item(item.name, item.type, item.price, item.station);
  }
}
