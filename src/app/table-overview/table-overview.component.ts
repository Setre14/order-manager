import { Component, OnInit } from '@angular/core';
import {TableOverviewService} from './table-overview.service';
import {FavouritesOverlayService} from '../favourites/favourites-overlay.service';
import {OrderService} from '../order/order.service';

@Component({
  selector: 'app-table-overview',
  templateUrl: './table-overview.component.html',
  styleUrls: [
    './table-overview.component.scss',
    '../style/style.scss'
  ]
})
export class TableOverviewComponent implements OnInit {

  constructor(
    public tableOverviewService: TableOverviewService,
    public favouritesService: FavouritesOverlayService,
    public ordersService: OrderService
  ) { }

  ngOnInit() {
  }

  hasOpenOrder(table: string): boolean {
    return this.ordersService.hasOpenOrder(table);
  }
}
