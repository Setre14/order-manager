import {Station} from './station';

export class Item {
  name: string;
  price: number;
  type: string;
  station: Station | null;

  constructor(name: string, type: string, price: number) {
    this.name = name;
    this.price = price;
    this.type = type;
    this.station = null;
  }

  isType(type: string) {
    return this.type === type;
  }
}
