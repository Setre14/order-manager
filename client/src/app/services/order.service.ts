import { Injectable } from '@angular/core';
import {Order, RestAction, RestAPI, Item, OrderItem} from '../../../../shared';
import {CommunicationService} from './communication.service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders: Map<string, Order> = new Map<string, Order>();

  activeOrder: Order | null = null;

  constructor(
    public comService: CommunicationService
  ) { }

  hasOrder(table: string): boolean {
    return this.orders.has(table.toLowerCase());
  }

  getOrder(table: string): Order {
    return this.orders.get(table.toLowerCase());
  }

  setOrder(table: string, order: Order): void {
    this.orders.set(table.toLowerCase(), order);
  }

  hasOpenOrder(table: string): boolean {
    if (!this.hasOrder(table)) {
      return false;
    }

    return this.getOrder(table).isOpen();
  }

  getOrderItemTypes(table: string): string[] {
    const order = this.getOrder(table);

    if (order == undefined) {
      return [];
    }

    return this.getOrder(table).getItemTypes();
  }

  resetActiveOrder(): void {
    this.activeOrder = null;
  }

  async addActiveOrder(): Promise<void> {
    await this.addOrder(this.activeOrder);
    this.resetActiveOrder();
  }

  async addOrder(order: Order): Promise<void> {
    if (order === null) {
      return;
    }

    const table = order.table;    
    if (this.hasOpenOrder(table)) {
      const o = this.getOrder(table);
      o.addOrder(order);
      await this.comService.post(RestAPI.ORDER, RestAction.UPDATE, o);
    } else {
      this.setOrder(table, order);
      await this.comService.post(RestAPI.ORDER, RestAction.INSERT, order);
    }
  }

  getOrderItem(item: Item): OrderItem | null {
    if (this.activeOrder === null) {
      return null;
    }

    return this.activeOrder.getOrderItem(item);
  }

  addItemToActiveOrder(table: string, item: Item): void {
    if (this.activeOrder === null) {
      this.activeOrder = new Order(table);
    }
    this.activeOrder.addItem(item);
  }

  removeItemFromActiveOrder(item: Item): number {
    const orderItem = this.getOrderItem(item);
    if (orderItem !== null) {
      orderItem.remove();

      if (orderItem.getTotalAmount() <= 0) {
        this.activeOrder.removeItem(item);
      }

      return orderItem.getTotalAmount();
    }

    return 0;
  }

  addComment(item: Item, comment: string, amount: number): void {
    const orderItem = this.getOrderItem(item);

    if (orderItem != null) {
      orderItem.addComment(comment, amount);
    }
  }

  getActiveOrderTotal(): number {
    if (this.activeOrder === null) {
      return 0;
    }

    return this.activeOrder.total();
  }

  async loadAllOpenOrder(): Promise<void> {
    await this.comService.post(RestAPI.ORDER, RestAction.GET, { open: true }).then(res => {
      this.orders = new Map<string, Order>();
      res.map((elem: Order) => Order.toOrder(elem)).forEach(order => {
        const table = order.table;
        this.setOrder(table, order);
      });
    });
  }

  async loadOrder(orderTable: string): Promise<void> {
    await this.comService.post(RestAPI.ORDER, RestAction.GET, { table: orderTable, open: true }).then(res => {
      const orders = res.map((elem: Order) => Order.toOrder(elem));
      if (orders.length > 0) {
        this.setOrder(orderTable, orders[0]);
      }
    });
  }

  getActive(): Order {
    return this.activeOrder;
  }

  getOpenAmount(table: string, item: Item): number {
    const orderItem = this.getOrder(table).getOrderItem(item);
    let payItemAmount = 0;

    const activeOrder = this.getActive();
    if (activeOrder != null) {
      const payOrderItem = this.getActive().getOrderItem(item);
      if (payOrderItem != null) {
        payItemAmount = payOrderItem.getTotalAmount();
      }
    }

    return orderItem.getOpenAmount() - payItemAmount;
  }

  payOrder(table: string): void {
    const order = this.getOrder(table);
    const activeOrder = this.getActive();
    if (order == null || activeOrder == null) {
      return
    }

    activeOrder.getOrderItems().forEach(orderItem => {
      order.pay(orderItem.item, orderItem.getTotalAmount())
    });

    this.comService.post(RestAPI.ORDER, RestAction.UPDATE, order);
  }
}
