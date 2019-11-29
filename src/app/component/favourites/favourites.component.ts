import { Component } from '@angular/core';
import {TableOverviewService} from '../../service/table-overview.service';
import {FavouritesOverlayService} from '../../service/favourites-overlay.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: [
    './favourites.component.scss',
    '../../style/style.scss'
  ]
})
export class FavouritesComponent {

  constructor(
    public tableOverviewService: TableOverviewService,
    public favOverlay: FavouritesOverlayService
  ) { }

}
