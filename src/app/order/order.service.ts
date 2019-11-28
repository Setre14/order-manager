import { Injectable } from '@angular/core';
import {Order} from './order';

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
}
