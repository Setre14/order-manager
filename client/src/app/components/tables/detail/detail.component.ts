import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { OrderItem } from '../../../../../../shared';
import { TableService } from 'src/app/services/table.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  COLUMNS = [
    { name: 'Item' },
    { name: 'Amount' }
  ];

  table: string;
  activeTab: string = '';
  expandedOrderItem: OrderItem | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private orderService: OrderService,
    private tableService: TableService
  ) { }

  async ngOnInit() {
    this.table = this.activatedRoute.snapshot.paramMap.get("table");

    await this.tableService.loadTables();
    if (!this.tableService.tableExists(this.table)) {
      // this.utilService.showSnackbar('Table ' + this.table + ' does not exist');

      this.navCtrl.navigateBack(['/']);
      return;
    }

    this.orderService.loadOrder(this.table);
  }

  getTitle(): string {
    return `Table ${this.table}`;
  }

  getTypes(): string[] {
    const types = this.orderService.getOrderItemTypes(this.table);
    
    if (types.length >= 1 && !this.activeTab) {
      this.activeTab = types[0];
    }

    return types;
  }

  segmentChanged(event: any): void {
    this.activeTab = event.detail.value;
    this.expandedOrderItem = null;
  }

  isTabChecked(type: string): boolean {
    return type == this.activeTab;
  }

  hasOpenOrder(): boolean {
    return this.orderService.hasOpenOrder(this.table);
  }

  getOrderItems(): any[] {
    if (!this.activeTab) {
      return [];
    }

    return this.orderService.getOrder(this.table).getOrderItemsByType(this.activeTab);
  }

  hasComments(orderItem: OrderItem): boolean {
    return orderItem.hasComments();
  }

  getComments(orderItem: OrderItem): string[] {
    return orderItem.getCommentStringList();
  }

  expand(orderItem: OrderItem): void {
    if (orderItem !== null && orderItem.comments !== null) {
      if (orderItem.isEqual(this.expandedOrderItem)) {
        this.expandedOrderItem = null;
      } else {
        this.expandedOrderItem = orderItem;
      }
    }
  }

  isExpanded(orderItem: OrderItem): boolean {
    return orderItem.isEqual(this.expandedOrderItem);
  }
}
