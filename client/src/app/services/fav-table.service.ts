import { Injectable } from '@angular/core';
import { FavTable, RestAPI, RestAction, Table, User } from '../../../../shared';
import { CommunicationService } from './communication.service';
import { TableService } from './table.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class FavTableService {
  favTables: Map<string, FavTable> = new Map<string, FavTable>();

  constructor(
    private tableService: TableService,
    public comService: CommunicationService,
    private userService: UserService
  ) {
    this.tableService.load();
  }

  getCurUser(): User {
    return this.userService.getUser();
  }

  getFavTable(id: string): Table {
    return this.tableService.getTable(id);
  }

  getFavTableIds(): string[] {
    const user = this.getCurUser();

    if (!user) {
      return [];
    }

    const favTable = this.favTables.get(user._id);

    if (!favTable) {
      return [];
    }

    return [...favTable.tables];
  }

  getFavLocTables(locId: string): Table[] {
    const user = this.getCurUser();

    if (!user) {
      return [];
    }

    const favTable = this.favTables.get(user._id);

    if (!favTable) {
      return [];
    }

    return favTable.tables
      .map(tableId => this.tableService.getTable(tableId))
      .filter(table => table !== undefined)
      .filter(table => table.location == locId)
      .sort((a: Table, b: Table) => a.name.localeCompare(b.name));
  }

  isFavTable(table: string): boolean {
    const user = this.getCurUser();

    if (!user) {
      return false;
    }

    const favTable = this.favTables.get(user._id);

    if (!favTable) {
      return false;
    }

    return favTable.tables.includes(table);
  }

  setFavTables(tables): void {
    const user = this.getCurUser();

    if (!user) {
      return;
    }

    let favTable = this.favTables.get(user._id);

    if (!favTable) {
      favTable = new FavTable(user._id);
    }

    favTable.tables = tables;

    this.favTables.set(favTable.user, favTable);

    console.log(favTable);

    this.comService.post(
      RestAPI.FAV_TABLE,
      RestAction.INSERT_OR_UPDATE,
      favTable
    );
  }

  async load() {
    const user = this.userService.getUser();

    if (!user) {
      return;
    }

    await this.comService
      .get<FavTable>(RestAPI.FAV_TABLE, RestAction.ALL)
      .then(res => {
        res.forEach(favTable => {
          this.favTables.set(favTable.user, favTable);
        });
      });
  }
}
