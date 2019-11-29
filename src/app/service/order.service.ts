import { Injectable } from '@angular/core';
import {Order} from '../class/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders: Map<string, Order[]> = new Map<string, Order[]>();

  constructor() {
  }

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
}
