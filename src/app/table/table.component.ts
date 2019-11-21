import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TableService} from './table.service';
import {TableOverviewService} from '../table-overview/table-overview.service';
import {MatSnackBar} from '@angular/material';
import {OrdersService} from '../order/orders.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  table: string;
  sub: any;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public tableService: TableService,
    public tableOverviewService: TableOverviewService,
    public snackBar: MatSnackBar,
    public ordersService: OrdersService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.table = params.table; // (+) converts string 'id' to a number
      if (!this.tableOverviewService.tableExists(this.table)) {
        console.log('Table ' + this.table + ' does not exist');
        this.snackBar.open('Table ' + this.table + ' does not exist', '', {
          duration: 2 * 1000,
          verticalPosition: 'top'
        });

        this.router.navigate(['/']);
        return;
      }
      // In a real app: dispatch action to load the details here.
    });
  }

  getItemsList() {
    console.log(this.ordersService.getOrder(this.table).items.keys())
    return this.ordersService.getOrder(this.table).items.keys();
  }

}
