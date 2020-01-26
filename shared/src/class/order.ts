import {Item} from './item';
import {OrderItem} from './order-item';
import { v1 as uuid } from 'uuid'

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

  isOpen() {
    return this.open;
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

    order.getOrderItems().forEach(orderItem => this.addOrderItem(orderItem));
  }

  addItem(item: Item, amount = 1): void {
    if (this.items.has(item.name)) {
      const orderItem = this.items.get(item.name);

      if (orderItem === undefined) {
        return;
      }

      orderItem.add(amount);
    } else {
      this.items.set(item.name, new OrderItem(item));
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

  getOrderItem(item: Item): OrderItem | null {
    if (this.items.has(item.name)) {
      const orderItem = this.items.get(item.name);

      if (orderItem === undefined) {
        return null
      }

      return orderItem;
    }

    return null;
  }

  getItemTypes(): string[] {
    const types: string[] = [];

    this.getOrderItems().forEach((item: OrderItem) => {
      if (item.getOpenAmount() !== 0) {
        if (!types.includes(item.getType())) {
          types.push(item.getType())
        }
      }
    })

    return types;
  }

  addOrderItem(orderItem: OrderItem): void {
    if (this.items.has(orderItem.item.name)) {
      const item = this.items.get(orderItem.item.name);
      if (item !== undefined) {
        item.add(orderItem.getTotalAmount());
        item.addCommentMap(orderItem.comments);
      }
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

  total(): number {
    let total = 0;
    const orderItems = this.getOrderItems();
    orderItems.forEach(orderItem => total += orderItem.total());
    return total;
  }

  pay(item: Item, amount: number) {
    const orderItem = this.getOrderItem(item);
    if (orderItem !== null) {
      orderItem.pay(amount);
    }

    this.setOpen();
  }

  toJSON() {
    return {
      uuid: this.uuid,
      table: this.table,
      items: Array.from(this.items.values()),
      open: this.open
    }
  }

  static toOrder(obj: Order): Order {
    const order = new Order(obj.table);
    order.uuid = obj.uuid;
    order.open = obj.open;

    obj.items.forEach((element: OrderItem) => {
      order.addOrderItem(OrderItem.toOrderItem(element));
    });

    return order;
  }
}
