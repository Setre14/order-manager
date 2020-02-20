import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FavTableService } from 'src/app/services/fav-table.service';
import { TableService } from 'src/app/services/table.service';
import { ModalController, NavController } from '@ionic/angular';
import { Table } from '../../../../../../shared';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  tableControl = new FormControl();

  tables: string[] = [];

  constructor(
    public navCtrl: NavController,
    public favTableService: FavTableService,
    public tableService: TableService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.tableService.load();
    this.favTableService.load();

    this.tables = this.getTableNames();
  }

  getFavTables(): Table[] {
    return this.favTableService
      .getFavTableIds()
      .map(tableId => this.tableService.getTable(tableId));
  }

  getTableNames(): string[] {
    return this.tableService.getTableNames();
  }

  getTables(ev: any) {
    this.tables = this.getTableNames();

    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.tables = this.tables.filter((table: string) => {
        return table.toLowerCase().includes(val.toLowerCase());
      });
    }
  }

  route(table: Table): void {
    this.navCtrl.navigateForward(['/tables', 'detail', table.name]);
    this.close();
  }

  close(): void {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
}
