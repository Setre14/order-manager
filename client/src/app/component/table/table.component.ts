import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TableService} from '../../service/table.service';
import {OrderService} from '../../service/order.service';
import {ItemService} from '../../service/item.service';
import {LangService} from '../../service/lang.service';
import {Order} from '../../../../../shared';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  table: string;
  sub: any;

  constructor(
    public langService: LangService,
    public route: ActivatedRoute,
    public router: Router,
    public tableService: TableService,
    public utilService: UtilService,
    public orderService: OrderService,
    public itemService: ItemService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.table = params.table;
      if (!this.tableService.tableExists(this.table)) {
        this.utilService.showSnackbar('Table ' + this.table + ' does not exist');

        this.router.navigate(['/']);
        return;
      }
    });

    this.itemService.loadItems();
    this.orderService.loadOrder(this.table);

    this.langService.setTableTitle(this.table);
  }

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

    return this.orderService.getOrderItemTypes(this.table);
  }

  orderHasItemType(type: string): boolean {
    return this.getOrder().hasItemType(type);
  }
}
