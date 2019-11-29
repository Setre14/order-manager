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

  addItem(item: Item, amount = 1): void {
    if (this.items.has(item)) {
      this.items.get(item).add(amount);
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

  getOrderItem(item: Item): OrderItem | null {
    if (this.items.has(item)) {
      return this.items.get(item);
    }
    return null;
  }

  addOrderItem(orderItem: OrderItem): void {
    if (this.items.has(orderItem.item)) {
      const item = this.items.get(orderItem.item);
      item.add(orderItem.amount);
      item.addCommentMap(orderItem.comments);
    } else {
      this.items.set(orderItem.item, orderItem);
    }
  }

  getOrderItemsByType(type: string): OrderItem[] {
    return this.getOrderItems().filter(orderItem => orderItem.isType(type));
  }

  hasItemType(type: string): boolean {
    return this.getOrderItemsByType(type).length > 0;
  }
}
