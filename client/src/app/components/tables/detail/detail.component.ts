import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { OrderItem, Table, Type, Order } from '../../../../../../shared';
import { TableService } from 'src/app/services/table.service';
import { NavController } from '@ionic/angular';
import { TypeService } from 'src/app/services/type.service';
import { ItemService } from 'src/app/services/item.service';

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

  table: Table;
  activeTab: string = '';
  expandedOrderItem: OrderItem | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private itemService: ItemService,
    private orderService: OrderService,
    private tableService: TableService,
    private typeService: TypeService
  ) { }

  async ngOnInit() {
    const tableName = this.activatedRoute.snapshot.paramMap.get("table");

    await this.tableService.load();
    if (this.tableService.tableExists(tableName)) {
      this.table = this.tableService.getTableFromName(tableName);
    } else {
      // this.utilService.showSnackbar('Table ' + this.table + ' does not exist');

      this.navCtrl.navigateBack(['/']);
      return;
    }

    await this.itemService.load()
    await this.typeService.load()
    this.orderService.loadOrder(this.table._id);
  }

  getTitle(): string {
    if (!this.table) {
      return '';
    }

    return `Table ${this.table.name}`;
  }

  getTypes(): Type[] {
    if (!this.table) {
      return [];
    }

    const types = this.orderService.getOrderItemTypes(this.table._id);
    
    if (types.length >= 1 && !this.activeTab) {
      this.activeTab = types[0];
    }

    console.log()
    return types.map(type => this.typeService.getType(type)).filter(type => type != undefined);
  }

  segmentChanged(event: any): void {
    this.activeTab = event.detail.value;
    this.expandedOrderItem = null;
  }

  isTabChecked(type: Type): boolean {
    return type._id == this.activeTab;
  }

  hasOpenOrder(): boolean {
    if (!this.table) {
      return false;
    }

    return this.orderService.hasOpenOrder(this.table._id);
  }

  getOrderItems(): any[] {
    if (!this.activeTab) {
      return [];
    }

    const order = this.orderService.getOrder(this.table._id);

    const orderItems = order.getOrderItems().filter(orderItem => {
      const item = this.itemService.getItem(orderItem.item);
      const t = this.typeService.getType(item.type);
      return t._id == this.activeTab
    });

    return orderItems;
  }

  getItemName(orderItem: OrderItem): string {
    return this.itemService.getItem(orderItem.item).name;
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

  route(path: string): void {
    if (!this.table) {
      return;
    }

    this.navCtrl.navigateForward(['/tables', path, this.table.name]);
  }
}
