import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { OrderItem, Table, Type, Order } from '../../../../../../shared';
import { TableService } from 'src/app/services/table.service';
import { NavController } from '@ionic/angular';
import { TypeService } from 'src/app/services/type.service';
import { ItemService } from 'src/app/services/item.service';
import { CommentService } from 'src/app/services/comment.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  COLUMNS = [{ name: 'Item' }, { name: 'Amount' }];
  ALL_ITEMS = 'all';

  table: Table;
  activeTab: string = this.ALL_ITEMS;
  expandedOrderItem: OrderItem | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private commentService: CommentService,
    private itemService: ItemService,
    private orderService: OrderService,
    private tableService: TableService,
    private typeService: TypeService,
    private utilService: UtilService
  ) {}

  async ngOnInit() {
    const tableName = this.activatedRoute.snapshot.paramMap.get('table');

    await this.tableService.load();
    if (this.tableService.tableExists(tableName)) {
      this.table = this.tableService.getTableFromName(tableName);
    } else {
      this.utilService.showToast('Table ' + tableName + ' does not exist');

      this.navCtrl.navigateBack(['/']);
      return;
    }

    await this.commentService.load();
    await this.itemService.load();
    await this.typeService.load();
    await this.orderService.loadOrder(this.table._id);
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

    const types = this.orderService
      .getOrderItemTypes(this.table._id)
      .sort((a: Type, b: Type) => a.name.localeCompare(b.name));

    return types;
  }

  segmentChanged(event: any): void {
    this.activeTab = event.detail.value;
    this.expandedOrderItem = null;
  }

  hasOpenOrder(): boolean {
    if (!this.table) {
      return false;
    }

    return this.orderService.hasOpenOrder(this.table._id);
  }

  getOrderItems(): OrderItem[] {
    if (!this.activeTab) {
      return [];
    }

    const order = this.orderService.getOrder(this.table._id);

    let orderItems = order.getOpenOrderItems();

    if (this.activeTab != this.ALL_ITEMS) {
      orderItems = orderItems.filter(orderItem => {
        const item = this.itemService.getItem(orderItem.item);
        const t = this.typeService.getType(item.type);
        return t ? t._id == this.activeTab : false;
      });
    }

    return orderItems.sort((a: OrderItem, b: OrderItem) =>
      this.itemService
        .getItem(a.item)
        .name.localeCompare(this.itemService.getItem(b.item).name)
    );
  }

  getItemName(orderItem: OrderItem): string {
    return this.itemService.getItem(orderItem.item).name;
  }

  hasComments(orderItem: OrderItem): boolean {
    return orderItem.hasComments();
  }

  getComments(orderItem: OrderItem): string[] {
    const comments = orderItem.getComments();
    return comments.map(comment => {
      const commentName = this.commentService.getComment(comment.commentId)
        .name;

      return `${commentName}: ${comment.amount}x`;
    });
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
