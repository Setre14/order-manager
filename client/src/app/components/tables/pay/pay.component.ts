import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderItem, Item } from '../../../../../../shared';
import { NavController } from '@ionic/angular';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss'],
})
export class PayComponent implements OnInit {
  private table: string;
  private activeTab: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private payService: OrderService
  ) { }

  ngOnInit() {
    this.table = this.activatedRoute.snapshot.paramMap.get('table');

    this.payService.loadOrder(this.table);
  }

  getTitle(): string {
    return `Table ${this.table}: Pay`;
  }

  getTypes(): string[] {
    const types = this.payService.getOrderItemTypes(this.table);
    
    if (types.length >= 1 && !this.activeTab) {
      this.activeTab = types[0];
    }

    return types;
  }

  segmentChanged(event: any): void {
    this.activeTab = event.detail.value;
  }

  isTabChecked(type: string): boolean {
    return type == this.activeTab;
  }

  getItemsByType(): OrderItem[] {
    if (!this.activeTab) {
      return [];
    }

    return [];
    // return this.payService.getOrder(this.table).getOrderItemsByType(this.activeTab).filter(orderItem => orderItem.getOpenAmount() > 0);
  }

  getOrderItem(item: Item): OrderItem | null {
    return this.payService.getOrderItem(item._id);
  }

  getOpenAmount(item: Item): number {
    const orderItem = this.getOrderItem(item);
    if (orderItem !== null) {
      return orderItem.getOpenAmount();
    }
    return 0;
  }

  add(itemId: string , amount: number = 1): void {
    // const orderItem = this.payService.getOrderItem(itemId);
    
    // if ( orderItem == null || this.payService.getOpenAmount(this.table, itemId) >= amount) {
    //   for(let i = 0; i < amount; i++) {
    //     this.payService.addItemToActiveOrder(this.table, itemId);
    //   }
    // }
  }

  addAll(): void {
    const orderItems = this.payService.getOrder( this.table ).getOrderItems();
    orderItems.forEach(orderItem => {
      // this.add(orderItem.item, this.payService.getOpenAmount(this.table, orderItem.item));
    });
  }

  remove(item: Item) {
    this.payService.removeItemFromActiveOrder(item);
  }

  async pay(): Promise<void> {
    this.payService.payOrder(this.table);
    this.payService.resetActiveOrder();

    if (!this.payService.hasOpenOrder(this.table)) {
      this.navCtrl.navigateBack(['/tables', 'overview']);
    }
  }

  cancel(): void {
    this.payService.resetActiveOrder();
    this.navCtrl.navigateRoot(['/tables', 'detail', this.table]);
  }
}
