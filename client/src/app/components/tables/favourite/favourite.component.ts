import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TableService } from 'src/app/services/table.service';
import { FavTableService } from 'src/app/services/fav-table.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss'],
})
export class FavouriteComponent implements OnInit {
  favTables: string[] = [];

  constructor(
    private modalCtrl: ModalController,
    private tableService: TableService,
    public favTableService: FavTableService,
    public locationService: LocationService,
  ) { }

  async ngOnInit() {
    this.tableService.loadTables();
    this.favTableService.loadFavTable().then(() => this.reset())
    this.locationService.loadLocations();
  }

  getLocation(): string[] {
    return this.locationService.getLocations();
  }

  getLocTableNames(loc: string): string[] {
    return this.tableService.getLocationTableNames(loc);
  }

  isFavourite(table: string): boolean {
    return this.favTables.includes(table);
  }

  toggleFav(table: string): void {
    if (this.favTables.includes(table)) {
      this.favTables = this.favTables.filter(fav => fav != table);
    } else {
      this.favTables.push(table);
    }
  }

  changeFavTable(table: string) {
    if (this.favTables.includes(table)) {
      this.favTables = this.favTables.filter(t => t !== table);
    } else {
      this.favTables.push(table);
    }
  }

  reset() {
    this.favTables = this.favTableService.getFavTable();
  }

  save() {
    this.favTableService.setFavTables(this.favTables);

    // this.utilService.showSnackbar('Saved Favourites')
  
    this.close();
  }

  close(): void {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
