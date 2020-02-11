import {Item} from './item';
import {OrderItem} from './order-item';
import { DBElem } from './dbElem';

export class Order extends DBElem {
  table: string;
  items: Map<string, OrderItem> = new Map<string, OrderItem>();
  open = true;

  constructor(table: string) {
    super()
    this.table = table;
  }

  setOpen() {
    for (const orderItem of this.getOrderItems()) {
      if (orderItem.getOpenAmount() !== 0) {
        this.open = true;
        return
      }
    }

    this.open = false;
  }

  addOrder(order: Order) {
    if (this.table !== order.table) {
      return;
    }
    console.log(order)
    order.getOrderItems().forEach(orderItem => this.addOrderItem(orderItem));
    console.log(order)
  }

  addItem(itemId: string, amount = 1): void {
    if (this.items.has(itemId)) {
      const orderItem = this.items.get(itemId);

      if (orderItem === undefined) {
        return;
      }

      orderItem.add(amount);
    } else {
      this.items.set(itemId, new OrderItem(itemId));
    }
  }

  removeItem(item: Item) {
    if (this.items.has(item.name)) {
      const orderItem = this.items.get(item.name);

      if (orderItem === undefined) {
        return;
      }

      orderItem.remove();
      if (orderItem.getTotalAmount() <= 0) {
        this.items.delete(item.name);
      }
    }
  }

  getOrderItems(): OrderItem[] {
    return Array.from(this.items.values());
  }

  getOpenOrderItems(): OrderItem[] {
    return this.getOrderItems().filter(orderItem => orderItem.getOpenAmount() > 0);
  }

  getOrderItem(itemId: string): OrderItem | null {
    if (this.items.has(itemId)) {
      const orderItem = this.items.get(itemId);

      if (orderItem === undefined) {
        return null
      }

      return orderItem;
    }

    return null;
  }

  addOrderItem(orderItem: OrderItem): void {
    if (this.items.has(orderItem.item)) {
      const item = this.items.get(orderItem.item);
      if (item !== undefined) {
        item.add(orderItem.getTotalAmount());
        item.addCommentMap(orderItem.comments);
      }
    } else {
      this.items.set(orderItem.item, orderItem);
    }
  }

  pay(itemId: string, amount: number) {
    const orderItem = this.getOrderItem(itemId);
    if (orderItem !== null) {
      orderItem.pay(amount);
    }

    this.setOpen();
  }

  toJSON() {
    return {
      _id: this._id,
      table: this.table,
      items: Array.from(this.items.values()).map(item => item.toJSON()),
      open: this.open
    }
  }

  static fromJson(obj: Order): Order {
    const order = new Order(obj.table);
    order._id = obj._id;
    order.open = obj.open;

    obj.items.forEach((element: OrderItem) => {
      order.addOrderItem(OrderItem.fromJson(element));
    });

    return order;
  }
}
