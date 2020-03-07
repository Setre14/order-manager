import { OrderItem } from "./order-item";

export class PayOrder {
  userId: string;
  payTime: Date;
  items: Map<string, OrderItem> = new Map<string, OrderItem>();

  constructor() {
    this.payTime = new Date();
  }

  addOrderItem(orderItem: OrderItem): void {
    if (this.items.has(orderItem.itemId)) {
      const item = this.items.get(orderItem.itemId);
      if (item !== undefined) {
        item.add(orderItem.getTotalAmount());
        item.addCommentMap(orderItem.comments);
      }
    } else {
      this.items.set(orderItem.itemId, orderItem);
    }
  }

  toJSON() {
    return {
      userId: this.userId,
      payTime: this.payTime,
      items: Array.from(this.items.values()).map(item => item.toJSON()),
    };
  }

  static fromJson(obj: PayOrder): PayOrder {
    const payOrder = new PayOrder();
    payOrder.userId = obj.userId;
    payOrder.payTime = obj.payTime;

    obj.items.forEach((element: OrderItem) => {
      payOrder.addOrderItem(OrderItem.fromJson(element));
    });

    return payOrder;
  }
}