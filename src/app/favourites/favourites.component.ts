import { Component } from '@angular/core';
import {TableOverviewService} from '../table-overview/table-overview.service';
import {FavouritesOverlayService} from './favourites-overlay.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: [
    './favourites.component.scss',
    '../style/style.scss'
  ]
})
export class FavouritesComponent {

  constructor(
    public tableOverviewService: TableOverviewService,
    public favOverlay: FavouritesOverlayService
  ) { }

}
