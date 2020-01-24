import { Component, OnInit, Input } from '@angular/core';
import { Order, OrderItem } from '../../../../../shared';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-table-table',
  templateUrl: './table-table.component.html',
  styleUrls: [
    './table-table.component.scss',
    '../../style/style.scss'
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableTableComponent implements OnInit {
  @Input() table: string;
  @Input() type: string;

  ORDER_COLUMNS = [
    'item',
    'amount'
  ];

  expandedOrderItem: OrderItem | null = null;

  constructor(
    public orderService: OrderService
  ) { }

  ngOnInit() {
    this.orderService.loadOrder(this.table);
  }

  getOrder(): Order | null {
    return this.orderService.getOrder(this.table);
  }

  getOrderItemsByType(type: string): OrderItem[] {
    if (this.getOrder() === null) {
      return [];
    }

    return this.getOrder().getOrderItemsByType(type).filter((orderItem: OrderItem) => orderItem.getAmount() !== 0);
  }

  expand(orderItem: OrderItem): void {
    if (orderItem !== null && orderItem.comments !== null) {
      if (orderItem.isEqual(this.expandedOrderItem)) {
        this.expandedOrderItem = null;
      } else {
        this.expandedOrderItem = orderItem;
      }
    }
  }

  hasComments(orderItem: OrderItem): boolean {
    return orderItem.hasComments();
  }

  isExpanded(orderItem: OrderItem): boolean {
    return orderItem.isEqual(this.expandedOrderItem);
  }

  getComments(orderItem: OrderItem): string[] {
    return orderItem.getCommentStringList();
  }
}
