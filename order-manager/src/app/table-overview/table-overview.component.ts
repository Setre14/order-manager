import { Component, OnInit } from '@angular/core';

export const TABLES: string[] = [
  '1',
  '2',
  '3',
  '1',
  '2',
  '3',
  '1',
  '2',
  '3',

];

@Component({
  selector: 'app-table-overview',
  templateUrl: './table-overview.component.html',
  styleUrls: [
    './table-overview.component.scss',
    '../style/style.scss'
  ]
})
export class TableOverviewComponent implements OnInit {

  tables = TABLES;
  selectedTable: string;

  constructor() { }

  ngOnInit() {
  }

  onSelect(table: string): void {
    this.selectedTable = table;
  }
}
