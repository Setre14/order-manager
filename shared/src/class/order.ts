import { Item } from './item';
import { OrderItem } from './order-item';
import { DBElem } from './dbElem';
import { PartialOrder } from './partial-order';
import { PayOrder } from './pay-order';

export class Order extends DBElem {
  table: string;
  createTime: Date;
  closeTime: Date;
  partialOrders: PartialOrder[] = [];
  payOrders: PayOrder[] = [];
  open = true;

  constructor(table: string) {
    super();
    this.table = table;
  }

  setOpen() {
    for (const orderItem of this.getOrderItems()) {
      if (orderItem.getOpenAmount() !== 0) {
        this.open = true;
        return;
      }
    }

    this.open = false;
  }

  addPartialOrder(partialOrder: PartialOrder) {
    if (this.partialOrders) {
      this.partialOrders.push(partialOrder)
    } else {
      this.partialOrders = [partialOrder];
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
      items = items.concat(partialOrder.getOrderItems())
    })

    const itemIds = items.map(orderItem => orderItem.itemId)

    const itemIdSet: Set<string> = new Set(itemIds);
    
    return Array.from(itemIdSet).map(itemId => this.getOrderItem(itemId));
  }

  getOpenOrderItems(): OrderItem[] {
    return this.getOrderItems().filter(
      orderItem => orderItem.getOpenAmount() > 0
    );
  }

  getOrderItem(itemId: string): OrderItem | null {
    let orderItem: OrderItem = null;

    this.partialOrders
      .map(partialOrder => partialOrder.getOrderItem(itemId))
      .filter(item => item != null)
      .forEach(item => {
        if (orderItem) {
          orderItem.add(item.getOpenAmount())
          orderItem.addCommentMap(item.comments)
        } else {
          orderItem = OrderItem.fromJson(item);
        }
      })

    return orderItem;
  }

  pay(itemId: string, amount: number) {
    this.partialOrders.forEach(partialOrder => {
      if (amount > 0) {
        const item = partialOrder.getOrderItem(itemId);
        if (item) {
          const openAmount = item.getOpenAmount();
          if (openAmount >= amount) {
            item.pay(amount);
          } else {
            item.pay(openAmount);
            amount -= openAmount;
          }
        }
      }
    })

    this.setOpen();
  }

  toJSON() {
    const partialOrdersJson = this.partialOrders ? this.partialOrders.map(partialOrder => partialOrder.toJSON()) : {};
    const payOrdersJson = this.payOrders ? this.payOrders.map(payOrder => payOrder.toJSON()) : {};
    return {
      _id: this._id,
      disabled: this.disabled,
      table: this.table,
      createTime: this.createTime,
      closeTime: this.closeTime,
      partialOrders: partialOrdersJson,
      payOrders: payOrdersJson,
      open: this.open,
    };
  }

  static fromJson(obj: Order): Order {
    const order = new Order(obj.table);
    order._id = obj._id;
    order.disabled = obj.disabled;
    order.createTime = obj.createTime;
    order.closeTime = obj.closeTime;
    order.open = obj.open;

    obj.partialOrders.forEach(partialOrder => {
      order.addPartialOrder(PartialOrder.fromJson(partialOrder));
    })

    return order;
  }
}
