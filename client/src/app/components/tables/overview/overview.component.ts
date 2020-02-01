import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table.service';
import { OrderService } from 'src/app/services/order.service';
import { FavTableService } from 'src/app/services/fav-table.service';
import { ModalController } from '@ionic/angular';
import { FavouriteComponent } from '../favourite/favourite.component';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  private activeTab: string;

  constructor(
    private favTableService: FavTableService,
    private orderService: OrderService,
    private tableService: TableService,
    private locService: LocationService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.favTableService.loadFavTable();
    this.orderService.loadAllOpenOrder();
    this.tableService.loadTables();
    this.locService.loadLocations();

    this.activeTab = 'fav';
  }

  getLocation(): string[] {
    return this.isFavTab() ? this.getFavLocations() : this.locService.getLocations();
  }

  getFavLocations(): string[] {
    const favTables = this.getFavTables();
    const locs = [];

    favTables.forEach(favTable => {
      const loc = this.tableService.getLocation(favTable);

      if (!locs.includes(loc)) {
        locs.push(loc);
      }
    })

    return locs;
  }

  getTableNames(loc: string): string[] {
    return this.isFavTab() ? this.favTableService.getLocationTableNames(loc) : this.tableService.getLocationTableNames(loc);
  }

  hasOpenOrder(table: string): boolean {
    return this.orderService.hasOpenOrder(table);
  }

  segmentChanged(event: any) {
    this.activeTab = event.detail.value;
  }

  isFavTab(): boolean {
    return this.activeTab == 'fav'
  }

  getAmountOpenOrders(tables: string[]): number {
    return tables.filter(table => this.hasOpenOrder(table)).length;
  }

  getFavTables(): string[] {
    return this.favTableService.getFavTable();
  }

  getAllTableNames(): string[] {
    return this.tableService.getTableNames();
  }

  getFavAmountOpenOrders(): number {
    return this.getAmountOpenOrders(this.getFavTables());
  }

  getFavAmountTables(): number {
    return this.getFavTables().length;
  }

  getTotalAmountOpenOrders(): number {
    return this.getAmountOpenOrders(this.getAllTableNames());
  }

  getTotalAmountTables(): number {
    return this.getAllTableNames().length;
  }

  async setFavourites(): Promise<void> {
    const modal = await this.modalController.create({
      component: FavouriteComponent
    });
    await modal.present();
  }
}
