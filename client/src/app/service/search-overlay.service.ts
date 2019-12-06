import { Injectable } from '@angular/core';
import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {SearchComponent} from '../component/search/search.component';

@Injectable({
  providedIn: 'root'
})
export class SearchOverlayService {
  searchPortal: ComponentPortal<SearchComponent>;
  overlayRef: OverlayRef;

  constructor(public overlay: Overlay) { }

  openOverlay() {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      positionStrategy
    });
    this.overlayRef = this.overlay.create(overlayConfig);
    this.searchPortal = new ComponentPortal(SearchComponent);
    this.overlayRef.attach(this.searchPortal);
  }

  closeOverlay() {
    this.overlayRef.detach();
  }
}
