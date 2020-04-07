import { Injectable } from '@angular/core';
import { FavTable, RestAPI, RestAction, Table, User } from '../../../../shared';
import { CommunicationService } from './communication.service';
import { TableService } from './table.service';
import { UserService } from './user.service';
import { StorableService } from './storable.service';

@Injectable({
  providedIn: 'root',
})
export class FavTableService extends StorableService<FavTable> {
  restAPI = RestAPI.FAV_TABLE;
  conversion = FavTable.fromJson;

  elements: Map<string, FavTable> = new Map<string, FavTable>();

  constructor(
    protected comService: CommunicationService,
    private tableService: TableService,
    private userService: UserService
  ) {
    super(comService);
    this.tableService.load();
  }

  getCurUser(): User {
    return this.userService.getUser();
  }

  getFavTable(tableId: string): Table {
    return this.tableService.getTable(tableId);
  }

  getFavTableIds(): string[] {
    const favTable = this.getUserFavTable();

    if (!favTable) {
      return [];
    }

    return [...favTable.tableIds];
  }

  getFavLocTables(locId: string): Table[] {
    const favTable = this.getUserFavTable();

    if (!favTable) {
      return [];
    }

    return favTable.tableIds
      .map(tableId => this.tableService.getTable(tableId))
      .filter(table => table !== undefined)
      .filter(table => table.locId == locId)
      .sort((a: Table, b: Table) => a.name.localeCompare(b.name));
  }

  isFavTable(table: string): boolean {
    const favTable = this.getUserFavTable();

    if (!favTable) {
      return false;
    }

    return favTable.tableIds.includes(table);
  }

  setFavTables(tables): void {
    let favTable = this.getUserFavTable();

    if (!favTable) {
      favTable = new FavTable(this.getCurUser()._id);
    }

    favTable.tableIds = tables;

    this.elements.set(favTable.user, favTable);

    this.dbUpdate(favTable);
  }

  getUserFavTable(): FavTable {
    const user = this.getCurUser();

    if (!user) {
      return null;
    }

    const favTables: FavTable[] = Array.from(this.elements.values()).filter(
      favTable => favTable.user == user._id
    );

    if (favTables.length < 1) {
      return null;
    }

    return favTables[0];
  }
}
