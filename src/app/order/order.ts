import {Item} from '../item/item';
import {OrderItem} from './order-item';

export class Order {
  table: string;
  items: Map<Item, OrderItem> = new Map<Item, OrderItem>();

  constructor(
    table: string
  ) {
    this.table = table;
  }

  addItem(item: Item): void {
    if (this.items.has(item)) {
      this.items.get(item).add();
    } else {
      this.items.set(item, new OrderItem(item));
    }
  }

  getOrderItems(): OrderItem[] {
    return Array.from(this.items.values());
  }

}
