import { Item } from './item';
import { OrderItem } from './order-item';
import { DBElem } from './dbElem';
import { PartialOrder } from './partial-order';

export class Order extends DBElem {
  tableId: string;
  createTime: Date = new Date();
  closeTime: Date = new Date();
  partialOrders: PartialOrder[] = [];
  payOrders: PartialOrder[] = [];
  open = true;

  constructor(table: string) {
    super();
    this.tableId = table;
  }

  getAllOrderItems(pOrders: PartialOrder[]): OrderItem[] {
    const orderItems: Map<string, OrderItem> = new Map<string, OrderItem>();

    pOrders
      .map(pOrder => pOrder.itemIds)
      .forEach(items => {
        items.forEach(item => {
          if (orderItems.has(item.itemId)) {
            const orderItem = orderItems.get(item.itemId);
            orderItem.add(item.amount);
            orderItem.addCommentMap(item.comments);
          } else {
            orderItems.set(item.itemId, OrderItem.fromJson(item));
          }
        });
      });

    return Array.from(orderItems.values());
  }

  checkIfOpen(): boolean {
    this.open = this.getOpenOrderItems().length > 0;
    return this.open;
  }

  addPartialOrder(partialOrder: PartialOrder) {
    this.partialOrders.push(partialOrder);

    if (this.partialOrders.length == 1) {
      this.createTime = partialOrder.date;
    }
  }

  addPartialOrders(partialOrders: PartialOrder[]) {
    if (this.partialOrders) {
      this.partialOrders = this.partialOrders.concat(partialOrders);
    } else {
      this.partialOrders = partialOrders;
    }
  }

  getOrderItems(): OrderItem[] {
    let items: OrderItem[] = [];
    this.partialOrders.forEach(partialOrder => {
      items = items.concat(partialOrder.getOrderItems());
    });

    const itemIds = items.map(orderItem => orderItem.itemId);

    const itemIdSet: Set<string> = new Set(itemIds);

    return Array.from(itemIdSet).map(itemId => this.getOrderItem(itemId));
  }

  getOpenOrderItems(): OrderItem[] {
    const orderItems = this.getAllOrderItems(this.partialOrders);
    const payedOrderItems = this.getAllOrderItems(this.payOrders);

    const openOrderItems = new Map<string, OrderItem>();

    orderItems.forEach(item => openOrderItems.set(item.itemId, item));

    payedOrderItems.forEach(payedItem => {
      openOrderItems.get(payedItem.itemId).remove(payedItem.amount);
    });

    return Array.from(openOrderItems.values()).filter(
      orderItem => orderItem.amount > 0
    );
  }

  getOrderItem(itemId: string): OrderItem | null {
    const orderItems = this.getAllOrderItems(this.partialOrders).filter(
      item => itemId == item.itemId
    );

    return orderItems.length > 0 ? orderItems[0] : null;
  }

  getOpenOrderItem(itemId: string): OrderItem | null {
    const orderItems = this.getOpenOrderItems().filter(
      item => itemId == item.itemId
    );

    return orderItems.length > 0 ? orderItems[0] : null;
  }

  pay(payOrder: PartialOrder) {
    this.payOrders.push(payOrder);

    if (!this.checkIfOpen()) {
      this.closeTime = payOrder.date;
    }
  }

  toJSON() {
    const partialOrdersJson = this.partialOrders
      ? this.partialOrders.map(partialOrder => partialOrder.toJSON())
      : {};
    const payOrdersJson = this.payOrders
      ? this.payOrders.map(payOrder => payOrder.toJSON())
      : {};
    return {
      _id: this._id,
      disabled: this.disabled,
      table: this.tableId,
      createTime: this.createTime,
      closeTime: this.closeTime,
      partialOrders: partialOrdersJson,
      payOrders: payOrdersJson,
      open: this.open,
    };
  }

  static fromJson(obj: Order): Order {
    const order = new Order(obj.tableId);
    order._id = obj._id;
    order.disabled = obj.disabled;
    order.createTime = obj.createTime;
    order.closeTime = obj.closeTime;
    order.open = obj.open;

    obj.partialOrders.forEach(partialOrder => {
      order.partialOrders.push(PartialOrder.fromJson(partialOrder));
    });

    obj.payOrders.forEach(payOrder => {
      order.payOrders.push(PartialOrder.fromJson(payOrder));
    });

    return order;
  }
}
