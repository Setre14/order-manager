import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TableOverviewService} from '../table-overview/table-overview.service';
import {MatSnackBar} from '@angular/material';
import {OrderService} from '../order/order.service';
import {Order} from '../order/order';
import {OrderItem} from '../order/order-item';
import {Item} from '../item/item';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: [
    './table.component.scss',
    '../style/style.scss'
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableComponent implements OnInit {
  table: string;
  sub: any;
  expandedOrderItem: OrderItem | null = null;

  ORDER_COLUMNS = [
    'item',
    'amount',
    'price',
    'total',
  ];

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public tableOverviewService: TableOverviewService,
    public snackBar: MatSnackBar,
    public ordersService: OrderService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.table = params.table;
      if (!this.tableOverviewService.tableExists(this.table)) {
        this.snackBar.open('Table ' + this.table + ' does not exist', '', {
          duration: 2 * 1000,
          verticalPosition: 'top'
        });

        this.router.navigate(['/']);
        return;
      }
      // In a real app: dispatch action to load the details here.
    });
  }

  hasOpenOrder(): boolean {
    return this.ordersService.hasOpenOrder(this.table);
  }

  getOrder(): Order | null {
    if (this.hasOpenOrder()) {
      return this.ordersService.getOrder(this.table);
    }
    return null;
  }

  getOrderItems(): OrderItem[] {
    const order = this.getOrder();
    if (order === null) {
      return [];
    }
    return this.getOrder().getOrderItems();
  }

  addItem(item: Item): void {
    this.getOrder().addItem(item);
  }

  removeItem(item: Item): void {
    this.getOrder().removeItem(item);
  }

  price(orderItem: OrderItem): string {
    return orderItem.price().toFixed(2);
  }

  totalItem(orderItem: OrderItem): string {
    return orderItem.total().toFixed(2);
  }

  total(): string {
    let total = 0;
    const orderItems = this.getOrderItems();
    orderItems.forEach(orderItem => total += orderItem.total());
    return total.toFixed(2);
  }

  expand(orderItem: OrderItem): void {
    if (orderItem !== null && orderItem.comment !== null) {
      if (this.expandedOrderItem === orderItem) {
        this.expandedOrderItem = null;
      } else {
        this.expandedOrderItem = orderItem;
      }
    }
  }

  hasComment(orderItem: OrderItem): boolean {
    // TODO: Remove after order was finished implemented, only for POC
    if (orderItem.name() === 'item3') {
      orderItem.comment = 'Test note';
    }
    return orderItem.comment !== null;
  }
}
