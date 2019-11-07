import { Component, OnInit } from '@angular/core';
import {TableOverviewService} from './table-overview.service';

@Component({
  selector: 'app-table-overview',
  templateUrl: './table-overview.component.html',
  styleUrls: [
    './table-overview.component.scss',
    '../style/style.scss'
  ]
})
export class TableOverviewComponent implements OnInit {

  selectedTable: string;

  constructor(private tableOverviewService: TableOverviewService) { }

  ngOnInit() {
  }

  onSelect(table: string): void {
    this.selectedTable = table;
  }
}
