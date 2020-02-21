import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TableService } from 'src/app/services/table.service';
import { FavTableService } from 'src/app/services/fav-table.service';
import { LocService } from 'src/app/services/loc.service';
import { Loc, Table } from '../../../../../../shared';
import { UtilService } from 'src/app/services/util.service';

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
    public locationService: LocService,
    private utilService: UtilService
  ) {}

  async ngOnInit() {
    this.tableService.load();
    this.favTableService.load().then(() => this.reset());
    this.locationService.load();
  }

  getLocation(): Loc[] {
    return this.locationService.getLocations();
  }

  getLocTables(loc: Loc): Table[] {
    return this.tableService.getLocTables(loc._id);
  }

  isFavourite(table: Table): boolean {
    return this.favTables.includes(table._id);
  }

  toggleFav(table: Table): void {
    if (this.favTables.includes(table._id)) {
      this.favTables = this.favTables.filter(fav => fav != table._id);
    } else {
      this.favTables.push(table._id);
    }
  }

  reset() {
    this.favTables = this.favTableService.getFavTableIds();
    this.utilService.showToast('Reset Favourites');
  }

  save() {
    this.favTableService.setFavTables(this.favTables);

    this.utilService.showToast('Saved Favourites');

    this.close();
  }

  close(): void {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
}
