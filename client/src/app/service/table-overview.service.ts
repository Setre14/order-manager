import { Injectable } from '@angular/core';
import {DbService} from './db.service';
import {Item, RestAction, RestAPI, Table} from '../../../../shared/src';

@Injectable({
  providedIn: 'root'
})
export class TableOverviewService {
  loadTables = true;
  loadFavTables = true;

  tables: string[] = [];
  favTables: string[] = [];

  constructor(
    public dbService: DbService
  ) { }

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

  getFavTables(actUser) {
    if (this.loadFavTables) {
      this.dbService.post<Table>(RestAPI.TABLE, RestAction.GET, { user: actUser}).then(res => this.favTables = res[0].tables);
      this.loadFavTables = false;
    }

    return this.favTables;
  }

  getTables() {
    if (this.loadTables) {
      this.dbService.post<Table>(RestAPI.TABLE, RestAction.GET, { user: 'all'}).then(res => this.tables = res[0].tables);
      this.loadTables = false;
    }

    return this.tables;
  }

  saveFavTables() {
    this.dbService.post<String>(RestAPI.TABLE, RestAction.UPDATE, new Table('user1', this.favTables)).catch();
  }
}
