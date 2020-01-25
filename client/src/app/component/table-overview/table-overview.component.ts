import {Component, OnInit} from '@angular/core';
import {TableService} from '../../service/table.service';
import {OrderService} from '../../service/order.service';
import {LangService} from '../../service/lang.service';
import {CommunicationService} from '../../service/communication.service';
import {Item} from '../../../../../shared';
import { UserService } from 'src/app/service/user.service';
import { FavTableService } from 'src/app/service/fav-table.service';
import { MatDialog } from '@angular/material';
import { FavouritesComponent } from '../favourites/favourites.component';
import { LocationService } from 'src/app/service/location.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-table-overview',
  templateUrl: './table-overview.component.html',
  styleUrls: ['./table-overview.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableOverviewComponent implements OnInit {

  items: Item[] | undefined = undefined;

  constructor(
    public langService: LangService,
    public tableService: TableService,
    public favTableService: FavTableService,
    public locationService: LocationService,
    public ordersService: OrderService,
    public dbService: CommunicationService,
    public userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.langService.setTitle('Table Overview');
    this.userService.loadUser();
    this.tableService.reload();
    this.favTableService.loadFavTable();
    this.locationService.loadLocations();
    this.ordersService.loadAllOpenOrder();
  }

  getLocations(): string[] {
    return this.locationService.getLocations();
  }

  getLocTables(loc): string[] {
    return this.tableService.getLocationTableNames(loc);
  }

  hasOpenOrder(table: string): boolean {
    return this.ordersService.hasOpenOrder(table);
  }

  getFavTables(): string[] {
    return this.favTableService.getFavTable();
  }

  getFavLocTables(loc: string): string[] {
    return this.favTableService.getFavLocTables(loc);
  }

  getTables(): string[] {
    return this.tableService.getTableNames();
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

  locAmountOpenOrders(loc: string): number {
    return this.getAmountOpenOrders(this.getLocTables(loc));
  }

  locAmountTables(loc: string): number {
    return this.getLocTables(loc).length;
  }

  getAmountOpenOrders(tables: string[]): number {
    return tables.filter(table => this.hasOpenOrder(table)).length;
  }

  openFavDialog(): void {
    this.dialog.open(FavouritesComponent, {});
  }
}
