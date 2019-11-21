import { Component, OnInit } from '@angular/core';
import {TableOverviewService} from '../table-overview/table-overview.service';
import {FavouritesService} from './favourites.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: [
    './favourites.component.scss',
    '../style/style.scss'
  ]
})
export class FavouritesComponent implements OnInit {
  checked: any;

  constructor(public tableOverviewService: TableOverviewService, public favOverlay: FavouritesService) { }

  ngOnInit() {
  }

}
