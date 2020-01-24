import {Component, OnInit} from '@angular/core';
import {TableOverviewService} from '../../service/table-overview.service';
import {OrderService} from '../../service/order.service';
import {LangService} from '../../service/lang.service';
import {CommunicationService} from '../../service/communication.service';
import {Item} from '../../../../../shared';
import { UserService } from 'src/app/service/user.service';
import { FavTableService } from 'src/app/service/fav-table.service';
import { MatDialog } from '@angular/material';
import { FavouritesComponent } from '../favourites/favourites.component';

@Component({
  selector: 'app-table-overview',
  templateUrl: './table-overview.component.html',
  styleUrls: ['./table-overview.component.scss']
})
export class TableOverviewComponent implements OnInit {

  items: Item[] | undefined = undefined;

  constructor(
    public langService: LangService,
    public tableOverviewService: TableOverviewService,
    public favTableService: FavTableService,
    public ordersService: OrderService,
    public dbService: CommunicationService,
    public userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.langService.setTitle('Table Overview');
    this.userService.loadUser();
    this.tableOverviewService.reload();
    this.favTableService.loadFavTable();
    this.ordersService.loadAllOpenOrder();
  }

  hasOpenOrder(table: string): boolean {
    return this.ordersService.hasOpenOrder(table);
  }

  getFavTables(): string[] {
    return this.favTableService.getFavTable();
  }

  getTables(): string[] {
    return this.tableOverviewService.getTableNames();
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

  openFavDialog(): void {
    this.dialog.open(FavouritesComponent, {});
  }
}
