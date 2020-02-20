import { Injectable } from '@angular/core';
import {Order, RestAction, RestAPI, Item, OrderItem, Type} from '../../../../shared';
import {CommunicationService} from './communication.service';
import { ItemService } from './item.service';
import { TypeService } from './type.service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders: Map<string, Order> = new Map<string, Order>();

  activeOrder: Order | null = null;

  constructor(
    private itemService: ItemService,
    private typeService: TypeService,
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
        return
      }
    })

    return exists;
  }

  getOrder(tableId: string): Order {
    let order = null;
    this.getOrders().forEach(o => {
      if (o.table == tableId) {
        order = o;
        return
      }
    })

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
        return
      }
    });

    return exists;
  }

  getOrderItemTypes(tableId: string): Type[] {
    const order = this.getOrder(tableId);

    if (order == null) {
      return [];
    }

    const orderItems = order.getOpenOrderItems();
    const types = []
    orderItems.forEach(orderItem => {
      const item = this.itemService.getItem(orderItem.item)

      if(!item) {
        return;
      }
      
      const type = item.type
      if (!types.includes(type)) {
        types.push(type);
      }
    });

    return types.map(type => this.typeService.getType(type)).filter(type => type != undefined);
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
      await this.comService.post(RestAPI.ORDER, RestAction.INSERT_OR_UPDATE, o);
    } else {
      this.setOrder(table, order);
      await this.comService.post(RestAPI.ORDER, RestAction.INSERT, order);
    }
  }

  getOrderItem(itemId: string): OrderItem | null {
    if (this.activeOrder === null) {
      return null;
    }

    return this.activeOrder.getOrderItem(itemId);
  }

  addItemToActiveOrder(tableId: string, itemId: string): void {
    if (this.activeOrder === null) {
      this.activeOrder = new Order(tableId);
    }
    this.activeOrder.addItem(itemId);
  }

  removeItemFromActiveOrder(item: Item): number {
    const orderItem = this.getOrderItem(item._id);
    if (orderItem !== null) {
      orderItem.remove();

      if (orderItem.getTotalAmount() <= 0) {
        this.activeOrder.removeItem(item);
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
    // if (this.activeOrder === null) {
    //   return 0;
    // }

    // return this.activeOrder.total();

    return 0;
  }

  async load(): Promise<void> {
    await this.comService.post<Order>(RestAPI.ORDER, RestAction.GET, { open: true }).then(res => {
      const orders = new Map<string, Order>();
      res.forEach(order => {
        orders.set(order._id, Order.fromJson(order))
      });
      this.orders = orders;
    });
  }

  async loadOrder(orderTable: string): Promise<void> {
    await this.comService.post<Order>(RestAPI.ORDER, RestAction.GET, { table: orderTable, open: true }).then(res => {
      if (res.length <= 0) {
        return;
      }

      const order = Order.fromJson(res[0]);      
      this.orders.set(order._id, order);
    });
  }

  getActive(): Order {
    return this.activeOrder;
  }

  getOpenAmount(table: string, itemId: string): number {
    const orderItem = this.getOrder(table).getOrderItem(itemId);
    let payItemAmount = 0;

    const activeOrder = this.getActive();
    if (activeOrder != null) {
      const payOrderItem = this.getActive().getOrderItem(itemId);
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

    this.comService.post(RestAPI.ORDER, RestAction.INSERT_OR_UPDATE, order);
  }
}
