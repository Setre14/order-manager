import { Injectable } from '@angular/core';
import {Order} from './order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  orders: Map<string, Order> = new Map<string, Order>();

  constructor() {
    this.orders.set('6', new Order('6'));
  }

  hasOpenOrder(table: string): boolean {
    return this.orders.has(table);
  }

  getOrder(table: string): Order {
    return this.orders.get(table);
  }

}
