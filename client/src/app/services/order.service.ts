import { Injectable } from '@angular/core';
import {
  Order,
  RestAction,
  RestAPI,
  OrderItem,
  ItemType,
  PartialOrder,
} from '../../../../shared';
import { CommunicationService } from './communication.service';
import { ItemService } from './item.service';
import { TypeService } from './type.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orders: Map<string, Order> = new Map<string, Order>();

  activeTableId: string;
  activePartialOrder: PartialOrder | null = null;

  constructor(
    private itemService: ItemService,
    private typeService: TypeService,
    private userService: UserService,
    private comService: CommunicationService
  ) {
    this.itemService.load();
    this.typeService.load();
  }

  hasOrder(tableId: string): boolean {
    let exists = false;
    this.getOrders().forEach(o => {
      if (o.table == tableId) {
        exists = true;
        return;
      }
    });

    return exists;
  }

  getOrder(tableId: string): Order {
    let order = null;
    this.getOrders().forEach(o => {
      if (o.table == tableId) {
        order = o;
        return;
      }
    });

    return order;
  }

  getOrders(): Order[] {
    return Array.from(this.orders.values());
  }

  setOrder(table: string, order: Order): void {
    this.orders.set(table.toLowerCase(), order);
  }

  hasOpenOrder(tableId: string): boolean {
    let exists = false;
    this.getOrders().forEach(order => {
      if (order.table == tableId) {
        exists = true;
        return;
      }
    });

    return exists;
  }

  getOrderItemTypes(tableId: string): ItemType[] {
    const order = this.getOrder(tableId);

    if (order == null) {
      return [];
    }

    const orderItems = order.getOpenOrderItems();
    const types = [];
    orderItems.forEach(orderItem => {
      const item = this.itemService.getItem(orderItem.itemId);

      if (!item) {
        return;
      }

      const type = item.type;
      if (!types.includes(type)) {
        types.push(type);
      }
    });

    return types
      .map(type => this.typeService.getType(type))
      .filter(type => type != undefined);
  }

  resetActiveOrder(): void {
    this.activePartialOrder = null;
  }

  async addActiveOrder(): Promise<void> {
    await this.addOrder(this.activePartialOrder);
    this.resetActiveOrder();
  }

  async addOrder(partialOrder: PartialOrder): Promise<void> {
    if (!partialOrder) {
      return;
    }

    if (this.hasOpenOrder(this.activeTableId)) {
      const order = this.getOrder(this.activeTableId);
      order.addPartialOrder(partialOrder);
      await this.comService.post(RestAPI.ORDER, RestAction.INSERT_OR_UPDATE, order);
    } else {
      const order = new Order(this.activeTableId);
      order.addPartialOrder(partialOrder);
      this.setOrder(this.activeTableId, order);
      await this.comService.post(RestAPI.ORDER, RestAction.INSERT, order);
    }
  }

  getOrderItem(itemId: string): OrderItem | null {
    if (this.activePartialOrder === null) {
      return null;
    }

    return this.activePartialOrder.getOrderItem(itemId);
  }

  addItemToActiveOrder(tableId: string, itemId: string): void {
    this.activeTableId = tableId;
    if (!this.activePartialOrder) {
      this.activePartialOrder = new PartialOrder(this.userService.curUser._id);
    }
    this.activePartialOrder.addItem(itemId);
  }

  removeItemFromActiveOrder(itemId: string): number {
    const orderItem = this.getOrderItem(itemId);
    if (orderItem !== null) {
      orderItem.remove();

      if (orderItem.getTotalAmount() <= 0) {
        this.activePartialOrder.removeItem(itemId);
      }

      return orderItem.getTotalAmount();
    }

    return 0;
  }

  addComment(itemId: string, comment: string, amount: number): void {
    const orderItem = this.getOrderItem(itemId);

    if (orderItem != null) {
      orderItem.addComment(comment, amount);
    }
  }

  getActiveOrderTotal(): number {
    if (this.activePartialOrder === null) {
      return 0;
    }

    let total = 0;

    const orderItems = this.activePartialOrder.getOpenOrderItems();

    orderItems.forEach(orderItem => {
      const item = this.itemService.getItem(orderItem.itemId);
      total += item.price * orderItem.getOpenAmount();
    });

    return total;
  }

  async load(): Promise<void> {
    await this.comService
      .post<Order>(RestAPI.ORDER, RestAction.GET, { open: true })
      .then(res => {
        const orders = new Map<string, Order>();
        res.forEach(order => {
          orders.set(order._id, Order.fromJson(order));
        });
        this.orders = orders;
      });
  }

  async loadOrder(orderTable: string): Promise<void> {
    await this.comService
      .post<Order>(RestAPI.ORDER, RestAction.GET, {
        table: orderTable,
        open: true,
      })
      .then(res => {
        if (res.length <= 0) {
          return;
        }

        const order = Order.fromJson(res[0]);
        this.orders.set(order._id, order);
      });
  }

  getActive(): PartialOrder {
    return this.activePartialOrder;
  }

  getOpenAmount(table: string, itemId: string): number {
    const orderItem = this.getOrder(table).getOrderItem(itemId);
    let payItemAmount = 0;

    const activePartialOrder = this.getActive();
    if (activePartialOrder != null) {
      const payOrderItem = this.getActive().getOrderItem(itemId);
      if (payOrderItem != null) {
        payItemAmount = payOrderItem.getTotalAmount();
      }
    }

    return orderItem.getOpenAmount() - payItemAmount;
  }

  payOrder(table: string): void {
    const order = this.getOrder(table);
    const activePartialOrder = this.getActive();
    if (order == null || activePartialOrder == null) {
      return;
    }

    activePartialOrder.getOrderItems().forEach(orderItem => {
      order.pay(orderItem.itemId, orderItem.getTotalAmount());
    });

    this.comService.post(RestAPI.ORDER, RestAction.INSERT_OR_UPDATE, order);
  }
}
