import { Injectable } from '@angular/core';
import { CommunicationService } from './communication.service';
import { RestAction, RestAPI, Table } from '../../../../shared';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  tables: Map<string, Table> = new Map<string, Table>();
  favTables: string[] = [];

  constructor(public comService: CommunicationService) {}

  addTable(table: Table): void {
    if (!this.tableExists(table._id)) {
      this.tables.set(table._id, table);
      this.comService.post(RestAPI.TABLE, RestAction.INSERT, table);
    }
  }

  tableExists(tableName: string) {
    let exists = false;
    this.getTables().forEach(table => {
      if (table.name == tableName) {
        exists = true;
        return;
      }
    });

    return exists;
  }

  getTable(tableId: string): Table {
    return this.tables.get(tableId);
  }

  getTableFromName(tableName: string): Table {
    return this.getTables().filter(table => tableName == table.name)[0];
  }

  getTables(): Table[] {
    return Array.from(this.tables.values()).sort((a: Table, b: Table) =>
      a.name.localeCompare(b.name)
    );
  }

  getTableNames(): string[] {
    return this.getTables()
      .map((table: Table) => table.name)
      .sort();
  }

  getLocTables(loc: string): Table[] {
    return this.getTables()
      .filter(table => table.location == loc)
      .sort((a: Table, b: Table) => a.name.localeCompare(b.name));
  }

  getLocTableNames(location: string): string[] {
    return this.getLocTables(location)
      .map((table: Table) => table.name)
      .sort();
  }

  getLocation(id: string): string {
    const table = this.tables.get(id);
    if (table) {
      return table.location;
    }

    return '';
  }

  async load() {
    await this.comService
      .get<Table>(RestAPI.TABLE, RestAction.ALL)
      .then(res => {
        const tables = new Map<string, Table>();
        res.forEach(table => {
          tables.set(table._id, Table.fromJson(table));
        });
        this.tables = tables;
      });
  }

  async loadLocTables(loc: string) {
    await this.comService
      .post<Table>(RestAPI.TABLE, RestAction.GET, { location: loc })
      .then(res => {
        const locTables = this.getLocTables(loc);
        locTables.forEach(locTable => this.tables.delete(locTable._id));
        res.forEach(table => {
          this.tables.set(table._id, Table.fromJson(table));
        });
      });
  }

  disable(id: string) {
    if (this.tables.has(id)) {
      this.tables.delete(id);
      this.comService.post(RestAPI.TABLE, RestAction.DISABLE, { _id: id });
    }
  }

  async disableLoc(loc) {
    this.tables.delete(loc);
    await this.comService.post(RestAPI.TABLE, RestAction.DISABLE, { location: loc });
  }

  async disableAll(): Promise<void> {
    this.tables = new Map<string, Table>();
    await this.comService.get(RestAPI.TABLE, RestAction.DISABLE_ALL)
  }
}
