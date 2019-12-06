import {Component, OnInit} from '@angular/core';
import {TableOverviewService} from '../../service/table-overview.service';
import {FavouritesOverlayService} from '../../service/favourites-overlay.service';
import {OrderService} from '../../service/order.service';
import {LangService} from '../../service/lang.service';
import {CommunicationService} from '../../service/communication.service';
import {Item} from '../../../../../shared/src';

@Component({
  selector: 'app-table-overview',
  templateUrl: './table-overview.component.html',
  styleUrls: [
    './table-overview.component.scss',
    '../../style/style.scss'
  ]
})
export class TableOverviewComponent implements OnInit {

  items: Item[] | undefined = undefined;

  constructor(
    public langService: LangService,
    public tableOverviewService: TableOverviewService,
    public favouritesService: FavouritesOverlayService,
    public ordersService: OrderService,
    public dbService: CommunicationService
  ) { }

  ngOnInit() {
    this.langService.title = 'Table Overview';
    this.tableOverviewService.reload();
    this.ordersService.loadAllOpenOrder(this.tableOverviewService.tables);
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
