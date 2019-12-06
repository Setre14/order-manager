import {Item} from './item';
import {OrderItem} from './order-item';
import * as uuid from 'uuid/v1';

export class Order {
  uuid: string;
  table: string;
  items: Map<string, OrderItem> = new Map<string, OrderItem>();
  open = true;

  constructor(
    table: string
  ) {
    this.uuid = uuid();
    this.table = table;
  }

  addItem(item: Item, amount = 1): void {
    if (this.items.has(item.name)) {
      this.items.get(item.name).add(amount);
    } else {
      this.items.set(item.name, new OrderItem(item));
    }
  }

  removeItem(item: Item) {
    if (this.items.has(item.name)) {
      const orderItem = this.items.get(item.name);
      orderItem.remove();
      if (orderItem.amount <= 0) {
        this.items.delete(item.name);
      }
    }
  }

  getOrderItems(): OrderItem[] {
    return Array.from(this.items.values());
  }

  getOrderItem(item: Item): OrderItem | null {
    if (this.items.has(item.name)) {
      return this.items.get(item.name);
    }

    return null;
  }

  addOrderItem(orderItem: OrderItem): void {
    if (this.items.has(orderItem.item.name)) {
      const item = this.items.get(orderItem.item.name);
      item.add(orderItem.amount);
      item.addCommentMap(orderItem.comments);
    } else {
      this.items.set(orderItem.item.name, orderItem);
    }
  }

  getOrderItemsByType(type: string): OrderItem[] {
    return this.getOrderItems().filter(orderItem => orderItem.isType(type));
  }

  hasItemType(type: string): boolean {
    return this.getOrderItemsByType(type).length > 0;
  }

  toJSON() {
    return {
      uuid: this.uuid,
      table: this.table,
      items: Array.from(this.items.values()),
      open: this.open
    }
  }

  static toOrder(obj): Order {
    const order = new Order(obj.table);
    order.uuid = obj.uuid;
    order.open = obj.open;

    obj.items.forEach(element => {
      order.addOrderItem(OrderItem.toOrderItem(element));
    });

    return order;
  }
}
