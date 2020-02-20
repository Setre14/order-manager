import { Injectable } from '@angular/core';
import { FavTable, RestAPI, RestAction, Table } from '../../../../shared';
import { CommunicationService } from './communication.service';
import { TableService } from './table.service';

@Injectable({
  providedIn: 'root'
})
export class FavTableService {
  user = 'user1';

  favTables: FavTable = null;

  constructor(
    private tableService: TableService,
    public comService: CommunicationService
  ) { 
    this.tableService.load()
  }

  getFavTable(id: string): Table {
    return this.tableService.getTable(id);
  }

  getFavTableIds(): string[] {
    if (this.favTables === null || this.favTables === undefined) {
      return [];
    }

    return [...this.favTables.tables];
  }

  getFavLocTables(locId: string): Table[] {
    return this.favTables.tables
      .map(tableId => this.tableService.getTable(tableId))
      .filter(table => table !== undefined)
      .filter(table => table.location == locId)
      .sort();
  }

  isFavTable(table: string): boolean {
    return this.favTables.tables.includes(table);
  }

  setFavTables(tables): void {
    this.favTables.tables = tables;

    this.comService.post(RestAPI.FAV_TABLE, RestAction.INSERT_OR_UPDATE, this.favTables);
  }

  async load() {
    await this.comService.post<FavTable>(RestAPI.FAV_TABLE, RestAction.GET, {user: this.user}).then(res => {
      if (res[0] !== undefined) {
        this.favTables = res[0];
      } else {
        this.favTables = new FavTable(this.user);
      }
    });
  }
}
