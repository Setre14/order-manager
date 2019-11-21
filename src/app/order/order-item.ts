import {Item} from '../item/item';

export class OrderItem {
  item: Item;
  amount: number;

  constructor(item: Item, amount: number = 1) {
    this.item = item;
    this.amount = amount;
  }

  name(): string {
    return this.item.name;
  }

  add(): void {
    this.amount++;
  }

  remove(): void {
    if (this.amount > 0) {
      this.amount--;
    }
  }
}
