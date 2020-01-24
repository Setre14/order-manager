import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';
import { ItemService } from 'src/app/service/item.service';
import { OrderCommentService } from 'src/app/service/order-comment.service';
import { Item, OrderItem } from '../../../../../shared';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrderTableComponent implements OnInit {
  @Input() table: string;
  @Input() type: string;

  @ViewChild('commentInput', {static: false})
  input: ElementRef;


  ORDER_COLUMNS = [
    'item',
    'price',
    'amount',
    'comment'
  ];

  amount = 1;
  selComment: string;
  manualComment: string;

  expandedItem: Item | null = null;

  constructor(
    public itemService: ItemService,
    public orderService: OrderService,
    public orderCommentService: OrderCommentService
  ) { }

  ngOnInit() {
    this.itemService.loadItems();

    this.selComment = this.orderCommentService.getDefaultComment();
  }

  getItems(type: string): Item[] {
    return this.itemService.getItemsByType(type);
  }

  addItem(item: Item): void {
    this.orderService.addItemToActiveOrder(this.table, item);
  }

  removeItem(item: Item): void {
    const amount = this.orderService.removeItemFromActiveOrder(item);
    if (amount <= 0) {
      if (item === this.expandedItem) {
        this.expandedItem = null;
      }
    }
  }

  price(item: Item): number {
    return item.price;
  }

  expand(item: Item): void {
    if (item === null) {
      return;
    }

    const orderItem = this.orderService.getOrderItem(item);

    if (orderItem != null && orderItem.getAmount() > 0) {
      if (this.expandedItem === item) {
        this.expandedItem = null;
      } else {
        this.expandedItem = item;
        if (this.isManualComment()) {
          this.input.nativeElement.focus();
        }
      }
    }
  }

  getAmount(item: Item): number {
    const orderItem = this.getOrderItem(item);
    if (orderItem !== null) {
      return orderItem.getAmount();
    }

    return 0;
  }

  isExpanded(item: Item): boolean {
    if (this.expandedItem === null) {
      return false;
    }

    return item === this.expandedItem;
  }

  updateComment(item): void {
    if (this.expandedItem !== null) {
      const comment = this.isManualComment() ? this.manualComment : this.selComment;

      this.orderService.addComment(item, comment, this.amount);
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

    return this.getOrderItem(item).hasComments();
  }

  getOrderItem(item: Item): OrderItem | null {
    return this.orderService.getOrderItem(item);
  }

  getComments(item): string[] {
    const orderItem = this.getOrderItem(item);

    if (orderItem === null) {
      return [];
    }

    return orderItem.getCommentStringList();
  }
}
