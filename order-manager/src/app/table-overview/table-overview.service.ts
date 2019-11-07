import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableOverviewService {

  tables: string[] = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ];

  favTables: string[] = [
    '1',
    '3',
    '6',
    '9'
  ];


  constructor() { }

  tableExists(table) {
    let exists = false;
    this.tables.forEach(t => exists = exists || t === table);
    return exists;
  }
}
