import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material';
import {Overlay, OverlayConfig} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {SearchComponent} from './search/search.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'order-manager';
  snav: MatSidenav;

  @ViewChild('snav', {static: true})
  mobileQuery: MediaQueryList;

  searchPortal: ComponentPortal<SearchComponent>;

  private mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private overlay: Overlay
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    // this.mobileQuery.addListener(this.mobileQueryListener);
  }

  // ngOnDestroy(): void {
    // this.mobileQuery.removeListener(this.mobileQueryListener);
  // }

  toggleSidenav() {
    // if(this.mobileQuery.matches) {
    this.snav.toggle();
    // }
  }

  clickedSidenavBtn() {
    this.snav.close();
  }

  search() {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      // hasBackdrop: config.hasBackdrop,
      // backdropClass: config.backdropClass,
      // panelClass: config.panelClass,
      // scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });
    const overlayRef = this.overlay.create(overlayConfig);
    // const overlayRef = this.overlay.create({
    //     height: '400px',
    //     width: '600px',
    // });
    this.searchPortal = new ComponentPortal(SearchComponent);
    overlayRef.attach(this.searchPortal);
  }
}
