import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { Item, OrderItem, ItemType, Table } from '../../../../../../shared';
import { OrderService } from 'src/app/services/order.service';
import { ModalController, NavController } from '@ionic/angular';
import { CommentComponent } from '../comment/comment.component';
import { TypeService } from 'src/app/services/type.service';
import { TableService } from 'src/app/services/table.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['../../../style.scss'],
})
export class OrderComponent implements OnInit {
  table: Table;
  ALL_ITEMS = 'all';

  private activeTab: string = this.ALL_ITEMS;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private modalController: ModalController,
    private itemService: ItemService,
    private tableService: TableService,
    private typeService: TypeService,
    private orderService: OrderService,
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

    this.typeService.load();
    this.itemService.load();
    this.orderService.loadOrder(this.table._id);
    this.orderService.resetActiveOrder();
  }

  getTitle(): string {
    if (!this.table) {
      return '';
    }
    return `Tisch ${this.table.name}: Bestellen`;
  }

  segmentChanged(event: any): void {
    this.activeTab = event.detail.value;
  }

  isTabChecked(type: ItemType): boolean {
    return type._id == this.activeTab;
  }

  getTypes(): ItemType[] {
    const types = this.typeService.getTypes();

    return types;
  }

  getItemsByType(): Item[] {
    if (this.activeTab == this.ALL_ITEMS) {
      return this.itemService.getItems();
    }

    return this.itemService.getItemsByType(this.activeTab);
  }

  getOrderItem(item: Item): OrderItem | null {
    return this.orderService.getOrderItem(item._id);
  }

  getOpenAmount(item: Item): number {
    const orderItem = this.getOrderItem(item);
    if (orderItem !== null) {
      return orderItem.amount;
    }

    return 0;
  }

  add(item: Item): void {
    this.orderService.addItemToActiveOrder(this.table._id, item._id);
  }

  remove(itemId: string): void {
    this.orderService.removeItemFromActiveOrder(itemId);
  }

  async setComment(item: Item): Promise<void> {
    if (item === null) {
      return;
    }

    const orderItem = this.getOrderItem(item);

    if (orderItem != null && orderItem.amount > 0) {
      const modal = await this.modalController.create({
        component: CommentComponent,
        componentProps: {
          orderItem: orderItem,
        },
      });
      await modal.present();
    }
  }

  disableOrder(): boolean {
    return this.orderService.getActiveOrderTotal() == 0;
  }

  cancel(): void {
    this.orderService.resetActiveOrder();

    this.goToDetail();
  }

  async addOrder() {
    await this.orderService.addActiveOrder();
    this.utilService.showToast('Bestellung hinzugefügt');

    this.goToDetail();
  }

  goToDetail() {
    this.navCtrl.navigateBack(['/tables', 'detail', this.table.name]);
  }
}
