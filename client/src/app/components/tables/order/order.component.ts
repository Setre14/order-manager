import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { Item, OrderItem } from '../../../../../../shared';
import { OrderService } from 'src/app/services/order.service';
import { ModalController, NavController } from '@ionic/angular';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  @Input() table: string;

  private activeTab: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private modalController: ModalController,
    private itemService: ItemService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.table = this.activatedRoute.snapshot.paramMap.get('table');

    this.itemService.loadItems();
    this.orderService.loadOrder(this.table);
    this.orderService.resetActiveOrder();
  }

  getTitle(): string {
    return `Table ${this.table}: Order`;
  }

  segmentChanged(event: any): void {
    this.activeTab = event.detail.value;
  }

  isTabChecked(type: string): boolean {
    return type == this.activeTab;
  }

  getTypes(): string[] {
    const types = this.itemService.getTypes();
    
    if (types.length >= 1 && !this.activeTab) {
      this.activeTab = types[0];
    }

    return types;
  }

  getItemsByType(): Item[] {
    return this.itemService.getItemsByType(this.activeTab);
  }

  getOrderItem(item: Item): OrderItem | null {
    return this.orderService.getOrderItem(item);
  }

  getOpenAmount(item: Item): number {
    const orderItem = this.getOrderItem(item);
    if (orderItem !== null) {
      return orderItem.getOpenAmount();
    }

    return 0;
  }

  add(item: Item): void {
    this.orderService.addItemToActiveOrder(this.table, item);
  }

  remove(item: Item): void {
    this.orderService.removeItemFromActiveOrder(item);
  }

  async setComment(item: Item): Promise<void> {
    if (item === null) {
      return;
    }

    const orderItem = this.orderService.getOrderItem(item);

    if (orderItem != null && orderItem.getOpenAmount() > 0) {
      const modal = await this.modalController.create({
        component: CommentComponent,
        componentProps: {
          'orderItem': orderItem,
        }
      });
      await modal.present();
    }
  }

  cancel(): void {
    this.orderService.resetActiveOrder();

    this.goToDetail();
  }

  async addOrder() {
    await this.orderService.addActiveOrder();
    
    this.goToDetail();
  }

  goToDetail() {
    this.navCtrl.navigateBack(['/tables', 'detail', this.table]);
  }
}
