import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table.service';
import { OrderService } from 'src/app/services/order.service';
import { FavTableService } from 'src/app/services/fav-table.service';
import { ModalController } from '@ionic/angular';
import { FavouriteComponent } from '../favourite/favourite.component';
import { LocService } from 'src/app/services/loc.service';
import { Loc, Table } from '../../../../../../shared';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  activeTab: string;

  constructor(
    private favTableService: FavTableService,
    private orderService: OrderService,
    private tableService: TableService,
    private locService: LocService,
    private modalController: ModalController
  ) {}

  async ngOnInit() {
    await this.favTableService.load();
    await this.orderService.load();
    await this.tableService.load();
    await this.locService.load();

    this.activeTab = 'fav';
  }

  getLocation(): Loc[] {
    return this.isFavTab()
      ? this.getFavLocations()
      : this.locService.getLocations();
  }

  getFavLocations(): Loc[] {
    const favTables = this.getFavTables();
    const locs: Loc[] = [];

    favTables.forEach(favTable => {
      const table = this.tableService.getTable(favTable);

      if (table) {
        const locId = table.location;

        const loc = this.locService.getLocation(locId);

        if (loc && !locs.includes(loc)) {
          locs.push(loc);
        }
      }
    });

    return locs;
  }

  getTables(loc: Loc): Table[] {
    if (!loc) {
      return [];
    }
    return this.isFavTab()
      ? this.favTableService.getFavLocTables(loc._id)
      : this.tableService.getLocTables(loc._id);
  }

  hasOpenOrder(table: string): boolean {
    return this.orderService.hasOpenOrder(table);
  }

  segmentChanged(event: any) {
    this.activeTab = event.detail.value;
  }

  isFavTab(): boolean {
    return this.activeTab == 'fav';
  }

  getAmountOpenOrders(tables: string[]): number {
    return tables.filter(table => this.hasOpenOrder(table)).length;
  }

  getFavTables(): string[] {
    return this.favTableService.getFavTableIds();
  }

  getAllTableIds(): string[] {
    return this.tableService.getTables().map(table => table._id);
  }

  getFavAmountOpenOrders(): number {
    return this.getAmountOpenOrders(this.getFavTables());
  }

  getFavAmountTables(): number {
    return this.getFavTables().length;
  }

  getTotalAmountOpenOrders(): number {
    return this.getAmountOpenOrders(this.getAllTableIds());
  }

  getTotalAmountTables(): number {
    return this.getAllTableIds().length;
  }

  async setFavourites(): Promise<void> {
    const modal = await this.modalController.create({
      component: FavouriteComponent,
    });
    await modal.present();
  }
}
