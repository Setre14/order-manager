import { OrderItem } from "./order-item";

export class PartialOrder {
  userId: string;
  date: Date;
  items: Map<string, OrderItem> = new Map<string, OrderItem>();

  constructor(userId) {
    this.userId = userId;
    this.date = new Date();
  }

  addOrderItem(orderItem: OrderItem): void {
    if (this.items.has(orderItem.itemId)) {
      const item = this.items.get(orderItem.itemId);
      if (item !== undefined) {
        item.add(orderItem.amount);
        item.addCommentMap(orderItem.comments);
      }
    } else {
      this.items.set(orderItem.itemId, orderItem);
    }
  }

  addItem(itemId: string, amount: number = 1): void {
    if (this.items.has(itemId)) {
      const orderItem = this.items.get(itemId);

      if (orderItem === undefined) {
        return;
      }

      orderItem.add(amount);
    } else {
      this.items.set(itemId, new OrderItem(itemId, amount));
    }
  }

  removeItem(itemId: string) {
    if (this.items.has(itemId)) {
      const orderItem = this.items.get(itemId);

      if (orderItem === undefined) {
        return;
      }

      orderItem.remove();
      if (orderItem.amount <= 0) {
        this.items.delete(itemId);
      }
    }
  }

  getOrderItems(): OrderItem[] {
    return Array.from(this.items.values());
  }

  getOrderItem(itemId: string): OrderItem | null {
    if (this.items.has(itemId)) {
      const orderItem = this.items.get(itemId);

      if (orderItem === undefined) {
        return null;
      }

      return orderItem;
    }

    return null;
  }

  getOpenOrderItems(): OrderItem[] {
    return this.getOrderItems().filter(
      orderItem => orderItem.amount > 0
    );
  }

  toJSON() {
    return {
      userId: this.userId,
      orderTime: this.date,
      items: Array.from(this.items.values()).map(item => item.toJSON()),
    };
  }

  static fromJson(obj: PartialOrder): PartialOrder {
    const partialOrder = new PartialOrder(obj.userId);
    partialOrder.date = obj.date;

    obj.items.forEach((element: OrderItem) => {
      partialOrder.addOrderItem(OrderItem.fromJson(element));
    });

    return partialOrder;
  }
}