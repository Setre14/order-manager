import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableOverviewService {

  tables: string[] = [
    '1',
    '2',
    '3',
    '1',
    '2',
    '3',
    '1',
    '2',
    '4',
  ];

  constructor() { }

  tableExists(table) {
    let exists = false;
    this.tables.forEach(t => exists = exists || t === table)
    return exists;
  }
}
