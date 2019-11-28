import {Item} from '../item/item';

export class OrderItem {
  item: Item;
  amount: number;
  comment: string | null = null;

  constructor(item: Item, amount: number = 1) {
    this.item = item;
    this.amount = amount;
  }

  name(): string {
    return this.item.name;
  }

  add(amount): void {
    this.amount += amount;
  }

  remove(): void {
    if (this.amount > 0) {
      this.amount--;
    }
  }

  price(): number {
    return this.item.price;
  }

  total(): number {
    return this.item.price * this.amount;
  }

  addComment(comment: string) {
    if (comment == null) {
      this.comment = comment;
    } else {
      this.comment += '\n' + comment;
    }
  }

  copy(): OrderItem {
    const item = new OrderItem(this.item, this.amount);
    item.addComment(this.comment);

    return item;
  }
}
