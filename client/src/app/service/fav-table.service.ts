import { Injectable } from '@angular/core';
import { FavTable, RestAPI, RestAction } from '../../../../shared';
import { CommunicationService } from './communication.service';

@Injectable({
  providedIn: 'root'
})
export class FavTableService {
  user = 'user1';

  favTables: FavTable = null;

  constructor(
    public comService: CommunicationService
  ) { }

  getFavTable(): string[] {
    if (this.favTables === null || this.favTables === undefined) {
      return [];
    }

    return [...this.favTables.tables];
  }

  isFavTable(table: string): boolean {
    return this.favTables.tables.includes(table);
  }

  setFavTables(tables): void {
    tables.sort();
    this.favTables.tables = tables;

    this.comService.post(RestAPI.FAV_TABLE, RestAction.UPDATE, this.favTables);
  }

  loadFavTable() {
    this.comService.post<FavTable>(RestAPI.FAV_TABLE, RestAction.GET, {user: this.user}).then(res => {
      if (res[0] !== undefined) {
        this.favTables = res[0];
        this.favTables.tables.sort();
      } else {
        this.favTables = new FavTable(this.user);
      }
    });
  }
}
