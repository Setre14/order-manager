import { Component, OnInit } from '@angular/core';
import { TableService } from '../../service/table.service';
import { FavTableService } from 'src/app/service/fav-table.service';
import { LangService } from 'src/app/service/lang.service';
import { LocationService } from 'src/app/service/location.service';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {
  favTables: string[] = [];

  constructor(
    public tableService: TableService,
    public favTableService: FavTableService,
    public locationService: LocationService,
    private langService: LangService,
    private utilService: UtilService,
  ) { }

  async ngOnInit() {
    this.langService.setTitle('Favourites')

    this.tableService.loadTables();
    this.favTableService.loadFavTable().then(() => this.reset())
    this.locationService.loadLocations();
  }

  getLocs(): string[] {
    return this.locationService.getLocations();
  }

  getTableNames(): string[] {
    return this.tableService.getTableNames();
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

    this.utilService.showSnackbar('Saved Favourites')
  }
}
