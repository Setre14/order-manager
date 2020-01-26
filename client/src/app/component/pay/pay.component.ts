import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TableService} from '../../service/table.service';
import {ItemService} from '../../service/item.service';
import {LangService} from '../../service/lang.service';
import {Item, Order, OrderItem} from '../../../../../shared';
import {PayService} from '../../service/pay.service';
import { UtilService } from 'src/app/service/util.service';


@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {
  table: string;
  sub: any;
  ORDER_COLUMNS = [
    'item',
    'price',
    'amount'
  ];
  constructor(
    public langService: LangService,
    public route: ActivatedRoute,
    public router: Router,
    public tableService: TableService,
    public utilService: UtilService,
    public payServ: PayService,
    public itemService: ItemService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.table = params.table;
      if (!this.tableService.tableExists(this.table)) {
        this.utilService.showSnackbar('Table ' + this.table + ' does not exist');

        this.router.navigate(['/']);
        return;
      }
    });

    this.langService.setTableTitle(this.table, 'Pay');

    this.itemService.loadItems();
    this.payServ.loadOrder(this.table);
    this.payServ.resetActiveOrder();
  }

  hasOpenOrder(): boolean {
    return this.payServ.hasOpenOrder(this.table);
  }

  getOrder(): Order | null {
    return this.payServ.getOrder(this.table);
  }

  total(): number {
    const order = this.payServ;

    if (order == null) {
      return 0;
    }

    return order.getActiveOrderTotal();
  }

  getAllTypes(): string[] {
    return this.itemService.getTypes();
  }

  getTypes(): string[] {
    if (!this.hasOpenOrder()) {
      return [];
    }

    return this.payServ.getOrderItemTypes(this.table);
  }

  orderHasItemType(type: string): boolean {
    return this.getOrder().hasItemType(type);
  }

  getOrderItemsByType(type: string): OrderItem[] {
    if (this.getOrder() === null) {
      return [];
    }
    return this.getOrder().getOrderItemsByType(type).filter(orderItem => !orderItem.isPayed());
  }

  async payItems(): Promise<void> {
    for (const i of this.payServ.getActive().getOrderItems()) {
      this.payServ.payOrder( this.table , i.item , this.getOpenAmount( i.item ) );
    }
    this.payServ.resetActiveOrder();

    if (!this.payServ.hasOpenOrder(this.table)) {
      await this.payServ.loadOrder(this.table);
      this.router.navigate(['/']);
    }
  }

  addAll(): void {
    const orderItems = this.payServ.getOrder( this.table ).getOrderItems();
    orderItems.forEach(orderItem => {
      this.addItem(orderItem.item, orderItem.getOpenAmount());
    });
  }

  removeItem(item: Item): void {
    this.payServ.removeItemFromActiveOrder(item);
  }

  addItem(item: Item , amount: number = 1): void {
    const orderItem = this.payServ.getOrderItem(item);
    
    if ( orderItem == null || orderItem.getOpenAmount() >= amount) {
      for(let i = 0; i < amount; i++) {
        this.payServ.addItemToActiveOrder(this.table, item);
      }
    }
  }

  getOpenAmount(item: Item): number {
    const orderItem = this.getOrderItem(item);
    if (orderItem !== null) {
      return orderItem.getOpenAmount();
    }
    return 0;
  }

  getOrderItem(item: Item): OrderItem | null {
    return this.payServ.getOrderItem(item);
  }
}
