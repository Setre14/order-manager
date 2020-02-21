import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderItem, Item, Table, Type } from '../../../../../../shared';
import { NavController } from '@ionic/angular';
import { OrderService } from 'src/app/services/order.service';
import { TableService } from 'src/app/services/table.service';
import { ItemService } from 'src/app/services/item.service';
import { TypeService } from 'src/app/services/type.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss'],
})
export class PayComponent implements OnInit {
  ALL_ITEMS = 'all';
  private table: Table;
  private activeTab: string = this.ALL_ITEMS;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private itemService: ItemService,
    private typeService: TypeService,
    private tableService: TableService,
    private payService: OrderService
  ) {}

  async ngOnInit() {
    const tableName = this.activatedRoute.snapshot.paramMap.get('table');

    await this.tableService.load();
    if (this.tableService.tableExists(tableName)) {
      this.table = this.tableService.getTableFromName(tableName);
    } else {
      this.navCtrl.navigateBack(['/']);
      return;
    }

    this.itemService.load();
    this.typeService.load();
    this.payService.loadOrder(this.table._id);
  }

  getTitle(): string {
    if (!this.table) {
      return '';
    }

    return `Table ${this.table.name}: Pay`;
  }

  getTypes(): Type[] {
    if (!this.table) {
      return [];
    }

    const types = this.payService.getOrderItemTypes(this.table._id).sort((a: Type, b: Type) =>
      a.name.localeCompare(b.name)
    );


    return types;
  }

  segmentChanged(event: any): void {
    this.activeTab = event.detail.value;
  }

  isTabChecked(type: Table): boolean {
    return type._id == this.activeTab;
  }

  getOrderItems(): OrderItem[] {
    if (!this.activeTab || !this.table) {
      return [];
    }

    const order = this.payService.getOrder(this.table._id);

    if (!order) {
      return;
    }

    let orderItems = order.getOpenOrderItems()
    
    if (this.activeTab != this.ALL_ITEMS) {
        orderItems = orderItems.filter(orderItem => {
        const item = this.itemService.getItem(orderItem.item);
        const t = this.typeService.getType(item.type);
        return t ? t._id == this.activeTab : false;
      });
    }

    return orderItems;
  }

  getOrderItem(itemId: string): OrderItem | null {
    return this.payService.getOrderItem(itemId);
  }

  getItemName(orderItem: OrderItem): string {
    return this.itemService.getItem(orderItem.item).name;
  }

  getPrice(orderItem: OrderItem): number {
    return this.itemService.getItem(orderItem.item).price;
  }

  getOpenAmount(itemId: string): number {
    const orderItem = this.getOrderItem(itemId);
    if (orderItem !== null) {
      return orderItem.getOpenAmount();
    }
    return 0;
  }

  hasAmountToPay(orderItem: OrderItem): boolean {
    const payItem = this.payService.getOrderItem(orderItem.item)

    if (!payItem) {
      return false;
    }

    return payItem.amount > 0;
  }

  add(itemId: string, amount: number = 1): void {
    const orderItem = this.payService.getOrderItem(itemId);

    if (
      orderItem == null ||
      this.payService.getOpenAmount(this.table._id, itemId) >= amount
    ) {
      for (let i = 0; i < amount; i++) {
        this.payService.addItemToActiveOrder(this.table._id, itemId);
      }
    }
  }

  addAll(): void {
    const orderItems = this.payService.getOrder(this.table._id).getOrderItems();
    orderItems.forEach(orderItem => {
      this.add(
        orderItem.item,
        this.payService.getOpenAmount(this.table._id, orderItem.item)
      );
    });
  }

  remove(itemId: string) {
    this.payService.removeItemFromActiveOrder(itemId);
  }

  async pay(): Promise<void> {
    this.payService.payOrder(this.table._id);
    this.payService.resetActiveOrder();

    if (!this.payService.hasOpenOrder(this.table._id)) {
      this.navCtrl.navigateBack(['/tables', 'overview']);
    }
  }

  cancel(): void {
    this.payService.resetActiveOrder();
    this.navCtrl.navigateRoot(['/tables', 'detail', this.table.name]);
  }
}
