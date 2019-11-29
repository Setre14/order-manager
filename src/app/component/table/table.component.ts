import {AfterContentInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TableOverviewService} from '../../service/table-overview.service';
import {MatSnackBar} from '@angular/material';
import {OrderService} from '../../service/order.service';
import {Order} from '../../class/order';
import {OrderItem} from '../../class/order-item';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ItemService} from '../../service/item.service';
import {LangService} from '../../service/lang.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: [
    './table.component.scss',
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
export class TableComponent implements OnInit, AfterContentInit {
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
    public langService: LangService,
    public route: ActivatedRoute,
    public router: Router,
    public tableOverviewService: TableOverviewService,
    public snackBar: MatSnackBar,
    public orderService: OrderService,
    public itemService: ItemService
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

  ngAfterContentInit(): void {
    this.langService.title = 'Table ' + this.table;
  }

  hasOpenOrder(): boolean {
    return this.orderService.hasOpenOrder(this.table);
  }

  getOrder(): Order | null {
    return this.orderService.getMergedOrder(this.table);
  }

  getOrderItemsByType(type: string): OrderItem[] {
    const order = this.getOrder();
    if (order === null) {
      return [];
    }
    return this.getOrder().getOrderItemsByType(type);
  }

  price(orderItem: OrderItem): number {
    return orderItem.price();
  }

  totalItem(orderItem: OrderItem): number {
    return orderItem.total();
  }

  totalByType(type: string): number {
    let total = 0;
    const orderItems = this.getOrderItemsByType(type);
    orderItems.forEach(orderItem => total += orderItem.total());
    return total;
  }

  total(): number {
    let total = 0;
    this.getTypes().forEach(
      type => total += this.totalByType(type)
    );
    return total;
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

  hasComment(orderItem: OrderItem): boolean {
    return orderItem.hasComment();
  }

  isExpanded(orderItem: OrderItem): boolean {
    return orderItem.isEqual(this.expandedOrderItem);
  }

  getAllTypes(): string[] {
    return this.itemService.getTypes();
  }

  getTypes(): string[] {
    if (!this.hasOpenOrder()) {
      return [];
    }

    return this.getAllTypes().filter(type => this.orderHasItemType(type));
  }

  orderHasItemType(type: string): boolean {
    return this.getOrder().hasItemType(type);
  }

  hasComments(orderItem: OrderItem): boolean {
    return orderItem.hasComment();
  }

  getComments(orderItem: OrderItem): string[] {
    return orderItem.getCommentStringList();
  }


}
