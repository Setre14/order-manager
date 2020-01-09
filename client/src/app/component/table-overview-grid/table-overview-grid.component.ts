import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-table-overview-grid',
  templateUrl: './table-overview-grid.component.html',
  styleUrls: ['./table-overview-grid.component.scss']
})
export class TableOverviewGridComponent implements OnInit {
  @Input() tables: string[]

  constructor(
    public orderService: OrderService
  ) { }

  ngOnInit() {
  }

  hasOpenOrder(table: string): boolean {
    return this.orderService.hasOpenOrder(table);
  }

}
