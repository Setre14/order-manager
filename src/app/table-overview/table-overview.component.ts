import { Component, OnInit } from '@angular/core';
import {TableOverviewService} from './table-overview.service';
import {FavouritesService} from '../favourites/favourites.service';
import {OrdersService} from '../order/orders.service';

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
    public favouritesService: FavouritesService,
    public ordersService: OrdersService
  ) { }

  ngOnInit() {
  }
}
