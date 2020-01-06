import { Injectable } from '@angular/core';
import {OrderService} from './order.service';

@Injectable({
  providedIn: 'root'
})
export class PayService extends OrderService{

}
