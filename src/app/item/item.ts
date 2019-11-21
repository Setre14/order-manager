import {Station} from '../station/station';

export class Item {
  name: string;
  price: number;
  station: Station;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}
