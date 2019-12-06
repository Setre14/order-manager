import {AfterContentInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemService} from '../../service/item.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {OrderService} from '../../service/order.service';
import {LangService} from '../../service/lang.service';
import {OrderCommentService} from '../../service/order-comment.service';
import {Item, Order, OrderItem} from '../../../../../shared/src';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: [
    './order.component.scss',
    '../../style/style.scss'],
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

  @ViewChild('commentInput', {static: false})
  input: ElementRef;

  amount = 1;
  selComment: string;
  manualComment: string;

  constructor(
    public langService: LangService,
    public route: ActivatedRoute,
    public itemService: ItemService,
    public orderService: OrderService,
    public orderCommentService: OrderCommentService
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.table = params.table;
    });
    this.selComment = this.orderCommentService.getDefaultComment();

    this.itemService.loadItems();
  }

  ngAfterContentInit(): void {
    this.langService.title = 'Table ' + this.table + ': Order';
  }

  getTypes(): string[] {
    return this.itemService.getTypes();
  }

  getItems(type: string): Item[] {
    return this.itemService.getItemsByType(type);
  }

  addItem(item: Item): void {
    if (this.order === null) {
      this.order = new Order(this.table);
    }
    this.order.addItem(item);
  }

  removeItem(item: Item): void {
    const orderItem = this.getOrderItem(item);
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

  totalItem(item: Item): number {
    if (this.order === null) {
      return 0;
    }
    const orderItem = this.getOrderItem(item);
    if (orderItem !== null) {
      return orderItem.total();
    }
    return null;
  }

  totalByType(type: string): number {
    if (this.order === null) {
      return 0;
    }

    let total = 0;

    this.order.getOrderItemsByType(type).forEach(orderItem => total += orderItem.total());

    return total;
  }

  total(): number {
    if (this.order === null) {
      return 0;
    }
    let total = 0;
    const orderItems = this.order.getOrderItems();
    orderItems.forEach(orderItem => total += orderItem.total());
    return total;
  }

  expand(item: Item): void {
    if (item === null) {
      return;
    }

    const orderItem = this.getOrderItem(item);

    if (orderItem !== null) {
      if (this.expandedOrderItem === orderItem) {
        this.expandedOrderItem = null;
      } else {
        this.expandedOrderItem = orderItem;
        if (this.isManualComment()) {
          this.input.nativeElement.focus();
        }
      }
    }
  }

  getAmount(item: Item): number {
    const orderItem = this.getOrderItem(item);
    if (orderItem !== null) {
      return orderItem.amount;
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
      const comment = this.isManualComment() ? this.manualComment : this.selComment;

      this.expandedOrderItem.addComment(comment, this.amount);
    }
  }

  getAmountList(item: Item): number[] {
    const list = [];

    for (let i = 0; i <= this.getAmount(item); i++) {
      list.push(i);
    }
    return list;
  }

  getDefaultComments(): string[] {
    return this.orderCommentService.getComments();
  }

  isManualComment() {
    return this.orderCommentService.isManual(this.selComment);
  }

  hasComments(item: Item): boolean {
    const orderItem = this.getOrderItem(item);

    if (orderItem === null) {
      return false;
    }

    return this.getOrderItem(item).hasComment();
  }

  getOrderItem(item: Item): OrderItem | null {
    if (this.order === null) {
      return null;
    }

    return this.order.getOrderItem(item);
  }

  getComments(item): string[] {
    const orderItem = this.getOrderItem(item);

    if (orderItem === null) {
      return [];
    }

    return orderItem.getCommentStringList();
  }
}
