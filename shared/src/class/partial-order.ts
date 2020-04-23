import { OrderItem } from './order-item';

export class PartialOrder {
  userId: string;
  date: Date;
  itemIds: Map<string, OrderItem> = new Map<string, OrderItem>();

  constructor(userId: string) {
    this.userId = userId;
    this.date = new Date();
  }

  addOrderItem(orderItem: OrderItem): void {
    if (this.itemIds.has(orderItem.itemId)) {
      const item = this.itemIds.get(orderItem.itemId);
      if (item !== undefined) {
        item.add(orderItem.amount);
        item.addCommentMap(orderItem.comments);
      }
    } else {
      this.itemIds.set(orderItem.itemId, orderItem);
    }
  }

  addItem(itemId: string, amount: number = 1): void {
    if (this.itemIds.has(itemId)) {
      const orderItem = this.itemIds.get(itemId);

      if (orderItem === undefined) {
        return;
      }

      orderItem.add(amount);
    } else {
      this.itemIds.set(itemId, new OrderItem(itemId, amount));
    }
  }

  removeItem(itemId: string) {
    if (this.itemIds.has(itemId)) {
      const orderItem = this.itemIds.get(itemId);

      if (orderItem === undefined) {
        return;
      }

      orderItem.remove();
      if (orderItem.amount <= 0) {
        this.itemIds.delete(itemId);
      }
    }
  }

  getOrderItems(): OrderItem[] {
    return Array.from(this.itemIds.values());
  }

  getOrderItem(itemId: string): OrderItem | null {
    if (this.itemIds.has(itemId)) {
      const orderItem = this.itemIds.get(itemId);

      if (orderItem === undefined) {
        return null;
      }

      return orderItem;
    }

    return null;
  }

  getOpenOrderItems(): OrderItem[] {
    return this.getOrderItems().filter(orderItem => orderItem.amount > 0);
  }

  toJSON() {
    return {
      userId: this.userId,
      orderTime: this.date,
      itemIds: Array.from(this.itemIds.values()).map(item => item.toJSON()),
    };
  }

  static fromJson(obj: PartialOrder): PartialOrder {
    const partialOrder = new PartialOrder(obj.userId);
    partialOrder.date = obj.date;

    obj.itemIds.forEach((element: OrderItem) => {
      partialOrder.addOrderItem(OrderItem.fromJson(element));
    });

    return partialOrder;
  }
}
