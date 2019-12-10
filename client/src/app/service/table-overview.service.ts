import { Injectable } from '@angular/core';
import {CommunicationService} from './communication.service';
import {Item, RestAction, RestAPI, Table} from '../../../../shared';

@Injectable({
  providedIn: 'root'
})
export class TableOverviewService {
  tables: string[] = [];
  favTables: string[] = [];

  constructor(
    public comService: CommunicationService,
  ) { }

  addTable(table: string): void {
    // this.comService.post(RestAPI.TABLE, RestAction.INSERT, table);
  }

  tableExists(table) {
    let exists = false;
    this.tables.forEach(t => exists = exists || t === table);
    return exists;
  }

  isFavourite(table) {
    return this.favTables.includes(table);
  }

  changeFavTable(table: string) {
    if (this.favTables.includes(table)) {
      this.favTables = this.favTables.filter(t => t !== table);
    } else {
      this.favTables.push(table);
    }
    this.favTables.sort();
  }

  saveFavTables() {
    this.comService.post<void>(RestAPI.TABLE, RestAction.UPDATE, new Table('user1', this.favTables)).catch();
  }

  async loadTables() {
    this.comService.post<Table>(RestAPI.TABLE, RestAction.GET, { user: 'all'}).then(res => this.tables = res[0].tables);
  }

  async loadFavTables() {
    this.comService.post<Table>(RestAPI.TABLE, RestAction.GET, { user: 'user1'}).then(res => this.favTables = res[0].tables);
  }

  async reload() {
    await this.loadTables();
    await this.loadFavTables();
  }
}
