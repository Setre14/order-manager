import { Injectable } from '@angular/core';
import {Order, RestAction, RestAPI, Item, OrderItem, Table} from '../../../../shared';
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

  resetActiveOrder(): void {
    this.activeOrder = null;
  }

  addActiveOrder(): void {
    this.addOrder(this.activeOrder);
    this.activeOrder = null;
  }

  addOrder(order: Order): void {
    if (order === null) {
      return;
    }

    const table = order.table;
    if (this.orders.has(table)) {
      this.orders.get(table).addOrder(order);
      this.comService.post(RestAPI.ORDER, RestAction.UPDATE, this.orders.get(table));
    } else {
      this.orders.set(table, order);
      this.comService.post(RestAPI.ORDER, RestAction.INSERT, order);
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

      if (orderItem.amount <= 0) {
        this.activeOrder.removeItem(item);
      }

      return orderItem.amount;
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

  loadAllOpenOrder(): void {
    this.comService.post(RestAPI.ORDER, RestAction.GET, { open: true }).then(res => {
      this.orders = new Map<string, Order>();
      res.map((elem: Order) => Order.toOrder(elem)).forEach(order => {
        const table = order.table;
        this.orders.set(table, order);
      });
    });
  }

  loadOrder(orderTable: string): void {
    this.comService.post(RestAPI.ORDER, RestAction.GET, { table: orderTable, open: true }).then(res => {
      const orders = res.map((elem: Order) => Order.toOrder(elem));
      if (orders.length > 0) {
        this.orders.set(orderTable, orders[0]);
      }
    });
  }
}
