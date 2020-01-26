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

  hasOpenOrder(table: string): boolean {
    if (!this.orders.has(table)) {
      return false;
    }

    return this.orders.get(table).isOpen();
  }

  getOrder(table: string): Order {
    return this.orders.get(table);
  }

  getOrderItemTypes(table: string): string[] {
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
    if (this.orders.has(table)) {
      const o = this.getOrder(table);
      o.addOrder(order);
      await this.comService.post(RestAPI.ORDER, RestAction.UPDATE, o);
    } else {
      this.orders.set(table, order);
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
        this.orders.set(table, order);
      });
    });
  }

  async loadOrder(orderTable: string): Promise<void> {
    await this.comService.post(RestAPI.ORDER, RestAction.GET, { table: orderTable, open: true }).then(res => {
      const orders = res.map((elem: Order) => Order.toOrder(elem));
      if (orders.length > 0) {
        this.orders.set(orderTable, orders[0]);
      }
    });
  }
}
