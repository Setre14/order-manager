import { Injectable } from '@angular/core';
import {Order} from './order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders: Map<string, Order> = new Map<string, Order>();

  constructor() {
  }

  hasOpenOrder(table: string): boolean {
    return this.orders.has(table);
  }

  getOrder(table: string): Order {
    return this.orders.get(table);
  }

  addOrder(order: Order): void {
    this.orders.set(order.table, order);
  }
}
