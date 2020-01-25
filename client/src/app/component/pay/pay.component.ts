import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TableService} from '../../service/table.service';
import {MatSnackBar} from '@angular/material';
import {ItemService} from '../../service/item.service';
import {LangService} from '../../service/lang.service';
import {Item, Order, OrderItem} from '../../../../../shared';
import {PayService} from '../../service/pay.service';


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
    public snackBar: MatSnackBar,
    public payServ: PayService,
    public itemService: ItemService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.table = params.table;
      if (!this.tableService.tableExists(this.table)) {
        this.snackBar.open('Table ' + this.table + ' does not exist', '', {
          duration: 2 * 1000,
          verticalPosition: 'top'
        });

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
    return this.getOrder().getOrderItemsByType(type);
  }

  payItems(): void {
    // @todo still have to implement the payment
    for (const i of this.payServ.getActive().getOrderItems()) {
      this.payServ.payOrder( this.table , i.item , this.getAmount( i.item ) );
    }
    this.payServ.resetActiveOrder();

    if (!this.payServ.hasOpenOrder(this.table)) {
      this.router.navigate(['/table-overview']);
    }
  }

  addAll(): void {
    for (const i of this.payServ.getOrder( this.table ).getOrderItems()) {
      for (let l = 0 ; l <= this.payServ.getOrder( this.table ).getOrderItem(i.item).getAmount() ; l++) {
        this.addItem( i.item , this.payServ.getOrder( this.table ).getOrderItem(i.item).getAmount());
      }
    }
  }

  removeItem(item: Item): void {
    this.payServ.removeItemFromActiveOrder(item);
  }

  addItem(item: Item , max: number): void {
    const service = this.payServ.getOrderItem(item);
    // @todo error
    if ( service == null || service.amount < max) {
      this.payServ.addItemToActiveOrder(this.table, item);
    }
  }

  getAmount(item: Item): number {
    const orderItem = this.getOrderItem(item);
    if (orderItem !== null) {
      return orderItem.getAmount();
    }
    return 0;
  }

  getOrderItem(item: Item): OrderItem | null {
    return this.payServ.getOrderItem(item);
  }
}
