import { Injectable } from '@angular/core';
import {Order, RestAction, RestAPI} from '../../../../shared/src';
import {CommunicationService} from './communication.service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders: Map<string, Order[]> = new Map<string, Order[]>();

  constructor(
    public comService: CommunicationService
  ) { }

  hasOpenOrder(table: string): boolean {
    return this.orders.has(table);
  }

  getOrders(table: string): Order[] {
    return this.orders.get(table);
  }

  addOrder(order: Order): void {
    const table = order.table;
    if (this.orders.has(table)) {
      this.orders.get(table).push(order);
    } else {
      this.orders.set(table, [order]);
    }

    this.comService.post(RestAPI.ORDER, RestAction.INSERT, order.toJSON());
  }

  getMergedOrder(table: string): Order {
    if (this.hasOpenOrder(table)) {
      const mergedOrder = new Order(table);
      const orders = this.getOrders(table);

      orders.forEach(order =>
        order.getOrderItems().forEach(orderItem =>
          mergedOrder.addOrderItem(orderItem.copy())
        )
      );

      return mergedOrder;
    }
    return null;
  }

  loadAllOpenOrder(tables: string[]): void {
    this.comService.post(RestAPI.ORDER, RestAction.GET, { open: true }).then(res => {
      this.orders = new Map<string, Order[]>();
      const orders = res.map(elem => Order.toOrder(elem)).forEach(order => {     
        const table = order.table;
        if (this.orders.has(table)) {
          this.orders.get(table).push(order);
        } else {
          this.orders.set(table, [order]);
        }
      })
    })
  }

  loadOrder(orderTable: string): void {
    this.comService.post(RestAPI.ORDER, RestAction.GET, { table: orderTable, open: true }).then(res => {
      const orders = res.map(elem => Order.toOrder(elem));
      if (orders.length > 0) {
        this.orders.set(orderTable, orders);
      }
    });
  }
}
