import {Item} from '../item/item';
import {OrderItem} from './order-item';

export class Order {
  table: string;
  items: Map<Item, OrderItem> = new Map<Item, OrderItem>();
  open = true;

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

  removeItem(item: Item) {
    if (this.items.has(item)) {
      const orderItem = this.items.get(item);
      orderItem.remove();
      if (orderItem.amount <= 0) {
        this.items.delete(item);
      }
    }
  }

  getOrderItems(): OrderItem[] {
    return Array.from(this.items.values());
  }
}
