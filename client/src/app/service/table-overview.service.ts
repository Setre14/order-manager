import { Injectable } from '@angular/core';
import {CommunicationService} from './communication.service';
import {RestAction, RestAPI, Table} from '../../../../shared';

@Injectable({
  providedIn: 'root'
})
export class TableOverviewService {
  tables: Map<string, Table[]> = new Map<string, Table[]>();
  favTables: string[] = [];

  constructor(
    public comService: CommunicationService,
  ) { }

  addTable(table: Table): void {
    if (!this.tableExists(table)) {
      if (this.tables.has(table.table)) {
        this.tables.get(table.table).push(table);
      } else {
        this.tables.set(table.table, [table]);
      }
      this.comService.post(RestAPI.TABLE, RestAction.INSERT, table);
    }
  }

  tableExists(table) {
    let exists = false;
    this.getTables().forEach(t => exists = exists || t.table === table);
    return exists;
  }

  getTables(): Table[] {
    const tableLists = Array.from(this.tables.values());
    const tables = [];
    tableLists.forEach(list => {
      tables.push(...list);
    });
    tables.sort((a: Table, b: Table) => a.table.localeCompare(b.table));
    return tables;
  }

  getTableNames(): string[] {
    return this.getTables().map((table: Table) => table.table);
  }

  getLocationTables(location: string): Table[] {
    return this.getTables().filter(table => table.location === location);
  }

  getLocationTableNames(location: string): string[] {
    return this.getLocationTables(location).map((table: Table) => table.table).sort();
  }

  async loadTables() {
    await this.comService.get<Table>(RestAPI.TABLE, RestAction.ALL).then(res => {
      this.tables = new Map<string, Table[]>();
      res.forEach(table => {
        const tableLoc = this.tables.get(table.location);

        const t = new Table(table.table, table.location);
        if (tableLoc === null || tableLoc === undefined) {
          this.tables.set(table.location, [ t ]);
        } else {
          tableLoc.push(t);
        }
      });
    });
  }

  async loadLocationTables(loc: string) {
    await this.comService.post<Table>(RestAPI.TABLE, RestAction.GET, { location: loc }).then(res => {
      this.tables.set(loc, res);
    });
  }

  async reload() {
    await this.loadTables();
  }
}
