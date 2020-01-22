import {AfterContentInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TableOverviewService} from '../../service/table-overview.service';
import {MatSnackBar} from '@angular/material';
import {OrderService} from '../../service/order.service';
import {ItemService} from '../../service/item.service';
import {LangService} from '../../service/lang.service';
import {Order} from '../../../../../shared';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: [
    './table.component.scss',
    '../../style/style.scss'
  ]
})
export class TableComponent implements OnInit, AfterContentInit {
  table: string;
  sub: any;

  constructor(
    public langService: LangService,
    public route: ActivatedRoute,
    public router: Router,
    public tableOverviewService: TableOverviewService,
    public snackBar: MatSnackBar,
    public orderService: OrderService,
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

  ngAfterContentInit(): void {
    this.langService.title = 'Table ' + this.table;
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
