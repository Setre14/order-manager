import { Injectable } from '@angular/core';
import {OrderService} from './order.service';
import {Order, RestAPI, RestAction, Item} from '../../../../shared';

@Injectable({
  providedIn: 'root'
})
export class PayService extends OrderService {
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
