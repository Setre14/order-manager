import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/service/table.service';
import { Table } from '../../../../../shared';
import { LocationService } from 'src/app/service/location.service';
import { AddTableRefComponent } from '../add-table-ref/add-table-ref.component';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['./add-table.component.scss']
})
export class AddTableComponent implements OnInit {

  constructor(
    private tableService: TableService,
    private locService: LocationService,
  ) { }

  ngOnInit() {
    this.locService.loadLocations();
    this.tableService.loadTables();
  }

  getLocations(): string[] {
    return this.locService.getLocations()
  }

  getTables(): Table[] {
    return this.tableService.getTables();
  }

  getLocTableNames(loc: string): string[] {
    return this.tableService.getLocationTableNames(loc);
  }
}
