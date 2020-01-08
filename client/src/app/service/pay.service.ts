import { Injectable } from '@angular/core';
import {OrderService} from './order.service';
import {Order} from "../../../../shared/src";

@Injectable({
  providedIn: 'root'
})
export class PayService extends OrderService{
  getactive(): Order {
    return this.activeOrder;
  }
}
