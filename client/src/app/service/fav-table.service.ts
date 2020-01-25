import { Injectable } from '@angular/core';
import { FavTable, RestAPI, RestAction } from '../../../../shared';
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
    this.tableService.loadTables()
  }

  getFavTable(): string[] {
    if (this.favTables === null || this.favTables === undefined) {
      return [];
    }

    return [...this.favTables.tables];
  }

  getFavLocTables(loc: string): string[] {
    return this.favTables.tables.filter((table: string) => this.tableService.getLocationTableNames(loc).includes(table));
  }

  isFavTable(table: string): boolean {
    return this.favTables.tables.includes(table);
  }

  setFavTables(tables): void {
    tables.sort();
    this.favTables.tables = tables;

    this.comService.post(RestAPI.FAV_TABLE, RestAction.UPDATE, this.favTables);
  }

  async loadFavTable() {
    await this.comService.post<FavTable>(RestAPI.FAV_TABLE, RestAction.GET, {user: this.user}).then(res => {
      if (res[0] !== undefined) {
        this.favTables = res[0];
        this.favTables.tables.sort();
      } else {
        this.favTables = new FavTable(this.user);
      }
    });
  }
}
