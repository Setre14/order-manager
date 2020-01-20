import { Injectable } from '@angular/core';
import {OrderService} from './order.service';
import {Order, RestAPI, RestAction, Item} from "../../../../shared";

@Injectable({
  providedIn: 'root'
})
export class PayService extends OrderService{
  getActive(): Order {
    return this.activeOrder;
  }

  payOrder(table: string, item: Item, num: number){
    const order = this.getOrder(table);
    this.getOrder(table).pay(item, num);
     
    this.comService.post(RestAPI.ORDER, RestAction.UPDATE, order);
  }
}
