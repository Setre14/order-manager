import {AfterContentInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TableOverviewService} from '../../service/table-overview.service';
import {MatSnackBar} from '@angular/material';
import {OrderService} from '../../service/order.service';
import {ItemService} from '../../service/item.service';
import {LangService} from '../../service/lang.service';
import {Order} from '../../../../../shared';
import {Item, OrderItem} from "../../../../../shared/src";


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
    public tableOverviewService: TableOverviewService,
    public snackBar: MatSnackBar,
    public orderService: OrderService,
    public payServ: OrderService,
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
    });

    this.itemService.loadItems();
    this.orderService.loadOrder(this.table);
  }

  /*ngAfterContentInit(): void {
    this.langService.title = 'Table ' + this.table;
    this.orderService.loadOrder(this.table);
  }*/

  hasOpenOrder(): boolean {
    return this.orderService.hasOpenOrder(this.table);
  }

  getOrder(): Order | null {
    return this.orderService.getOrder(this.table);
  }

  total(): number {
    const order = this.getOrder();

    if (order == null) {
      return 0;
    }

    return order.total();
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
  getOrderItemsByType(type: string): OrderItem[] {
    if (this.getOrder() === null) {
      return [];
    }
    return this.getOrder().getOrderItemsByType(type);
  }
  payitems(): void{
    // @todo still have to implement the payment
  }

  removeItem(item: Item): void {
    const amount = this.payServ.removeItemFromActiveOrder(item);
  }
  addItem(item: Item , max: number): void {
    console.log(this.payServ.getOrderItem(item));
    const service = this.payServ.getOrderItem(item);
    // @todo error
    if( service == null || service.amount < max){
      this.payServ.addItemToActiveOrder(this.table, item);
    }
  }
  getAmount(item: Item): number {
    const orderItem = this.getOrderItem(item);
    if (orderItem !== null) {
      return orderItem.amount;
    }
    return 0;
  }
  getOrderItem(item: Item): OrderItem | null {
    return this.payServ.getOrderItem(item);
  }
}
