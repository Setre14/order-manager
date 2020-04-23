import { Injectable } from '@angular/core';
import {
  Order,
  RestAPI,
  OrderItem,
  ItemType,
  PartialOrder,
} from '../../../../shared';
import { CommunicationService } from './communication.service';
import { ItemService } from './item.service';
import { TypeService } from './type.service';
import { UserService } from './user.service';
import { StorableService } from './storable.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends StorableService<Order> {
  restAPI = RestAPI.ORDER;
  conversion = Order.fromJson;

  elements: Map<string, Order> = new Map<string, Order>();

  activeTableId: string;
  activePartialOrder: PartialOrder | null = null;

  constructor(
    protected comService: CommunicationService,
    private itemService: ItemService,
    private typeService: TypeService,
    private userService: UserService
  ) {
    super(comService);
    this.itemService.load();
    this.typeService.load();
  }

  hasOrder(tableId: string): boolean {
    let exists = false;
    this.getOrders().forEach(o => {
      if (o.tableId == tableId) {
        exists = true;
        return;
      }
    });

    return exists;
  }

  getOrder(tableId: string): Order {
    let order = null;
    this.getOrders().forEach(o => {
      if (o.tableId == tableId) {
        order = o;
        return;
      }
    });

    return order;
  }

  getOrders(): Order[] {
    return Array.from(this.elements.values());
  }

  setOrder(table: string, order: Order): void {
    this.elements.set(table.toLowerCase(), order);
  }

  hasOpenOrder(tableId: string): boolean {
    let exists = false;
    this.getOrders().forEach(order => {
      if (order.tableId == tableId && order.open) {
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

      const type = item.typeId;
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
    this.activeTableId = null;
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
      await this.dbUpdate(order);
    } else {
      const order = new Order(this.activeTableId);
      order.addPartialOrder(partialOrder);
      this.setOrder(this.activeTableId, order);
      await this.dbInsert(order);
    }
  }

  getOrderItem(itemId: string): OrderItem | null {
    if (this.activePartialOrder === null) {
      return null;
    }

    return this.activePartialOrder.getOrderItem(itemId);
  }

  addItemToActiveOrder(
    tableId: string,
    itemId: string,
    amount: number = 1
  ): void {
    if (tableId != this.activeTableId) {
      this.activeTableId = tableId;
      this.activePartialOrder = new PartialOrder(this.userService.curUser._id);
    }

    if (!this.activePartialOrder) {
      this.activePartialOrder = new PartialOrder(this.userService.curUser._id);
    }
    this.activePartialOrder.addItem(itemId, amount);
  }

  removeItemFromActiveOrder(itemId: string): number {
    const orderItem = this.getOrderItem(itemId);
    if (orderItem !== null) {
      orderItem.remove();

      if (orderItem.amount <= 0) {
        this.activePartialOrder.removeItem(itemId);
      }

      return orderItem.amount;
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
      total += item.price * orderItem.amount;
    });

    return total;
  }

  async loadOrder(orderTable: string): Promise<void> {
    await this.dbGetFiltered({
      table: orderTable,
      open: true,
    }).then(res => {
      const result: Order[] = Array.from(res.values());
      if (result.length <= 0) {
        return;
      }

      const order = result[0];
      this.elements.set(order._id, order);
    });
  }

  getActive(): PartialOrder {
    return this.activePartialOrder;
  }

  payOrder(table: string): void {
    const order = this.getOrder(table);
    const activePartialOrder = this.getActive();
    if (order == null || activePartialOrder == null) {
      return;
    }

    order.pay(this.activePartialOrder);

    this.dbUpdate(order);
  }
}
