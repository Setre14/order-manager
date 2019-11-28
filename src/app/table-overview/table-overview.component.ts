import { Component, OnInit } from '@angular/core';
import {TableOverviewService} from './table-overview.service';
import {FavouritesOverlayService} from '../favourites/favourites-overlay.service';
import {OrderService} from '../order/order.service';

@Component({
  selector: 'app-table-overview',
  templateUrl: './table-overview.component.html',
  styleUrls: [
    './table-overview.component.scss',
    '../style/style.scss'
  ]
})
export class TableOverviewComponent implements OnInit {

  constructor(
    public tableOverviewService: TableOverviewService,
    public favouritesService: FavouritesOverlayService,
    public ordersService: OrderService
  ) { }

  ngOnInit() {
  }

  hasOpenOrder(table: string): boolean {
    return this.ordersService.hasOpenOrder(table);
  }

  getFavTables(): string[] {
    return this.tableOverviewService.favTables;
  }

  getTables(): string[] {
    return this.tableOverviewService.tables;
  }

  favAmountOpenOrders(): number {
    return this.getAmountOpenOrders(this.getFavTables());
  }

  favAmountTables(): number {
    return this.getFavTables().length;
  }

  amountOpenOrders(): number {
    return this.getAmountOpenOrders(this.getTables());
  }

  amountTables(): number {
    return this.getTables().length;
  }

  getAmountOpenOrders(tables: string[]): number {
    return tables.filter(table => this.hasOpenOrder(table)).length;
  }
}
