import {AfterContentInit, Component, ElementRef, OnInit, ViewChild, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemService} from '../../service/item.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {OrderService} from '../../service/order.service';
import {LangService} from '../../service/lang.service';
import {OrderCommentService} from '../../service/order-comment.service';
import {Item, Order, OrderItem} from '../../../../../shared';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: [
    './order.component.scss',
    '../../style/style.scss'
  ]
})
export class OrderComponent implements OnInit {
  table: string;
  sub: any;

  constructor(
    public langService: LangService,
    public route: ActivatedRoute,
    public itemService: ItemService,
    public orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.table = params.table;
    });
    this.itemService.loadItems();
    this.orderService.resetActiveOrder();

    this.langService.title = 'Table ' + this.table + ': Order';
  }

  getTypes(): string[] {
    return this.itemService.getTypes();
  }

  total(): number {
    return this.orderService.getActiveOrderTotal();
  }

  addOrder() {
    this.orderService.addActiveOrder();
  }
}
