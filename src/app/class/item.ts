import {Station} from './station';

export class Item {
  name: string;
  price: number;
  type: string;
  station: Station;

  constructor(name: string, type: string, price: number) {
    this.name = name;
    this.price = price;
    this.type = type;
  }

  isType(type: string) {
    return this.type === type;
  }
}
