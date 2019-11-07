import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {TableService} from './table.service';
import {TableOverviewService} from '../table-overview/table-overview.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  table: string;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private tableService: TableService,
    private tableOverviewService: TableOverviewService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.table = params.table; // (+) converts string 'id' to a number
      if (!this.tableOverviewService.tableExists(this.table)) {
        return;
      }
      // In a real app: dispatch action to load the details here.
    });
  }

}
