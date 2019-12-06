import { Injectable } from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {FavouritesComponent} from '../component/favourites/favourites.component';
import {TableOverviewService} from './table-overview.service';

@Injectable({
  providedIn: 'root'
})
export class FavouritesOverlayService {
  favouritesPortal: ComponentPortal<FavouritesComponent>;
  overlayRef: OverlayRef;

  constructor(
    public overlay: Overlay,
    public tableOverviewService: TableOverviewService
  ) { }

  openOverlay() {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      positionStrategy
    });
    this.overlayRef = this.overlay.create(overlayConfig);
    this.favouritesPortal = new ComponentPortal(FavouritesComponent);
    this.overlayRef.attach(this.favouritesPortal);
  }

  closeOverlay() {
    this.overlayRef.detach();
    this.tableOverviewService.saveFavTables();
  }
}
