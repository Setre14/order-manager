import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  OrderItem,
  Table,
  ItemType,
  PartialOrder,
} from '../../../../../../shared';
import { NavController, AlertController } from '@ionic/angular';
import { OrderService } from 'src/app/services/order.service';
import { TableService } from 'src/app/services/table.service';
import { ItemService } from 'src/app/services/item.service';
import { TypeService } from 'src/app/services/type.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['../../../style.scss'],
})
export class PayComponent implements OnInit {
  ALL_ITEMS = 'all';
  private table: Table;
  private activeTab: string = this.ALL_ITEMS;

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private itemService: ItemService,
    private typeService: TypeService,
    private tableService: TableService,
    private payService: OrderService,
    private utilService: UtilService
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
    this.payService.resetActiveOrder();
  }

  getTitle(): string {
    if (!this.table) {
      return '';
    }

    return `Tisch ${this.table.name}: Bezahlen`;
  }

  getTypes(): ItemType[] {
    if (!this.table) {
      return [];
    }

    const types = this.payService
      .getOrderItemTypes(this.table._id)
      .sort((a: ItemType, b: ItemType) => a.name.localeCompare(b.name));

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

    let orderItems = order.getOpenOrderItems();

    if (this.activeTab != this.ALL_ITEMS) {
      orderItems = orderItems.filter(orderItem => {
        const item = this.itemService.getItem(orderItem.itemId);
        const t = this.typeService.getType(item.typeId);
        return t ? t._id == this.activeTab : false;
      });
    }

    return orderItems;
  }

  getPayOrderItem(itemId: string): OrderItem | null {
    return this.payService.getOrderItem(itemId);
  }

  getItemName(orderItem: OrderItem): string {
    return this.itemService.getItem(orderItem.itemId).name;
  }

  getPrice(orderItem: OrderItem): number {
    return this.itemService.getItem(orderItem.itemId).price;
  }

  getAmountAddedToPayment(itemId: string): number {
    const orderItem = this.getPayOrderItem(itemId);
    if (orderItem !== null) {
      return orderItem.amount;
    }
    return 0;
  }

  hasAmountToPay(orderItem: OrderItem): boolean {
    const payItem = this.payService.getOrderItem(orderItem.itemId);

    if (!payItem) {
      return false;
    }

    return payItem.amount > 0;
  }

  getTotal(): number {
    return this.payService.getActiveOrderTotal();
  }

  add(itemId: string, amount: number = 1): void {
    const order = this.payService.getOrder(this.table._id);
    const orderItem = order.getOpenOrderItem(itemId);

    if (
      orderItem == null ||
      orderItem.amount >=
        amount + this.getAmountAddedToPayment(orderItem.itemId)
    ) {
      this.payService.addItemToActiveOrder(this.table._id, itemId, amount);
    }
  }

  allAdded(orderItem: OrderItem): boolean {
    return orderItem.amount == this.getAmountAddedToPayment(orderItem.itemId);
  }

  addAll(): void {
    const orderItems = this.payService
      .getOrder(this.table._id)
      .getOpenOrderItems();

    orderItems.forEach(orderItem => {
      let alreadyAdded = this.getAmountAddedToPayment(orderItem.itemId);
      this.add(orderItem.itemId, orderItem.amount - alreadyAdded);
    });

    this.utilService.showToast('Alle Items hinzugefügt');
  }

  remove(itemId: string) {
    this.payService.removeItemFromActiveOrder(itemId);
  }

  removeAll() {
    this.payService.resetActiveOrder();
  }

  getPayItemsAsString(): string {
    const order: PartialOrder = this.payService.getActive();

    if (!order) {
      return '';
    }
    let message = '<ion-list>\n';

    const orderItems: OrderItem[] = order.getOrderItems();

    orderItems.forEach(orderItem => {
      message += `\t<ion-item> ${this.getItemName(orderItem)}:\t ${
        orderItem.amount
      } </ion-item>\n`;
    });

    message += '</ion-list>\n';

    message += `Total: € ${this.getTotal()}`;

    return message;
  }

  disablePay(): boolean {
    return this.payService.getActiveOrderTotal() == 0;
  }

  async pay(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Bezahlen',
      message: this.getPayItemsAsString(),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.utilService.showToast(`Bezahlung abgebrochen`);
          },
        },
        {
          text: 'Pay',
          handler: () => {
            this.payService.payOrder(this.table._id);
            this.payService.resetActiveOrder();

            if (!this.payService.hasOpenOrder(this.table._id)) {
              this.utilService.showToast('Bestellung bezahlt');
              this.navCtrl.navigateBack(['/tables', 'overview']);
            } else {
              this.utilService.showToast('Bestellung teilweise bezahlt');
            }
          },
        },
      ],
    });

    alert.present();
  }

  cancel(): void {
    this.payService.resetActiveOrder();
    this.navCtrl.navigateRoot(['/tables', 'detail', this.table.name]);
  }
}
