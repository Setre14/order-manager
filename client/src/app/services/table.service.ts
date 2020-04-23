import { Injectable } from '@angular/core';
import { CommunicationService } from './communication.service';
import { RestAction, RestAPI, Table } from '../../../../shared';
import { StorableService } from './storable.service';

@Injectable({
  providedIn: 'root',
})
export class TableService extends StorableService<Table> {
  restAPI = RestAPI.TABLE;
  conversion = Table.fromJson;

  elements: Map<string, Table> = new Map<string, Table>();
  favTables: string[] = [];

  constructor(protected comService: CommunicationService) {
    super(comService);
  }

  addTable(table: Table): void {
    if (!this.tableExists(table._id)) {
      this.elements.set(table._id, table);
      this.dbInsert(table);
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
    return this.elements.get(tableId);
  }

  getTableFromName(tableName: string): Table {
    return this.getTables().filter(table => tableName == table.name)[0];
  }

  getTables(): Table[] {
    return Array.from(this.elements.values()).sort((a: Table, b: Table) =>
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
      .filter(table => table.locId == loc)
      .sort((a: Table, b: Table) => a.name.localeCompare(b.name));
  }

  getLocTableNames(location: string): string[] {
    return this.getLocTables(location)
      .map((table: Table) => table.name)
      .sort();
  }

  getLocation(id: string): string {
    const table = this.elements.get(id);
    if (table) {
      return table.locId;
    }

    return '';
  }

  async loadLocTables(loc: string) {
    await this.dbGetFiltered({ location: loc }).then(res => {
      const locTables = this.getLocTables(loc);
      locTables.forEach(locTable => this.elements.delete(locTable._id));
      res.forEach(table => {
        this.elements.set(table._id, Table.fromJson(table));
      });
    });
  }

  disable(id: string) {
    if (this.elements.has(id)) {
      this.elements.delete(id);
      this.dbDisableId(id);
    }
  }

  async disableLoc(loc) {
    this.elements.delete(loc);
    await this.dbDisable({ location: loc });
  }

  async disableAll(): Promise<void> {
    this.elements = new Map<string, Table>();
    await this.dbDdisableAll();
  }
}
