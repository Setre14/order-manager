import {AfterContentInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemService} from '../item/item.service';
import {OrderItem} from './order-item';
import {Item} from '../item/item';
import {Order} from './order';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {OrderService} from './order.service';
import {LangService} from '../lang.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: [
    './order.component.scss',
    '../style/style.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrderComponent implements OnInit, AfterContentInit {
  table: string;
  sub: any;
  order: Order | null = null;

  expandedOrderItem: OrderItem | null = null;

  ORDER_COLUMNS = [
    'item',
    'amount',
    'price',
    'total',
    'comment'
  ];

  comment: string;

  @ViewChild('commentInput', {static: false})
  input: ElementRef;

  constructor(
    public langService: LangService,
    public route: ActivatedRoute,
    public itemService: ItemService,
    public orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.table = params.table;
    });
  }

  ngAfterContentInit(): void {
    this.langService.title = 'Table ' + this.table + ': Order';
  }

  getTypes(): string[] {
    return this.itemService.getTypes();
  }

  getItems(type: string): Item[] {
    return this.itemService.getItems(type);
  }

  addItem(item: Item): void {
    if (this.order === null) {
      this.order = new Order(this.table);
    }
    this.order.addItem(item);
  }

  removeItem(item: Item): void {
    if (this.order === null) {
      return;
    }
    const orderItem = this.order.getOrderItem(item);
    if (orderItem !== null) {
      orderItem.remove();
      if (orderItem.amount <= 0) {
        this.order.removeItem(item);
        if (orderItem.isEqual(this.expandedOrderItem)) {
          this.expandedOrderItem = null;
        }
      }
    }
  }

  price(item: Item): number {
    return item.price;
  }

  totalItem(item: Item): string {
    if (this.order === null) {
      return '0';
    }
    const orderItem = this.order.getOrderItem(item);
    if (orderItem !== null) {
      return orderItem.total().toFixed(2);
    }
    return null;
  }

  total(): string {
    if (this.order === null) {
      return '0.00';
    }
    let total = 0;
    const orderItems = this.order.getOrderItems();
    orderItems.forEach(orderItem => total += orderItem.total());
    return total.toFixed(2);
  }

  expand(item: Item): void {
    if (item === null) {
      return;
    }

    if (this.order !== null) {
      const orderItem = this.order.getOrderItem(item);

      if (orderItem !== null) {
        if (this.expandedOrderItem === orderItem) {
          this.expandedOrderItem = null;
          this.comment = null;
        } else {
          this.expandedOrderItem = orderItem;
          this.comment = orderItem.comment;
          this.input.nativeElement.focus();
        }
      }
    }
  }

  getAmount(item: Item): number {
    if (this.order === null) {
      return 0;
    }
    const orderItem = this.order.getOrderItem(item);
    if (orderItem !== null) {
      return this.order.getOrderItem(item).amount;
    }

    return 0;
  }

  sendOrder() {
    if (this.order !== null) {
      this.orderService.addOrder(this.order);
    }
  }

  isExpanded(item: Item): boolean {
    if (this.expandedOrderItem === null) {
      return false;
    }

    return item === this.expandedOrderItem.item;
  }

  updateComment(): void {
    if (this.expandedOrderItem !== null) {
      this.expandedOrderItem.comment = this.comment;
    }
  }

  removeComment() {
    if (this.expandedOrderItem !== null) {
      this.expandedOrderItem.comment = '';
    }
  }
}
