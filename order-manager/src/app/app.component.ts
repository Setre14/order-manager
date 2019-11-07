import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'order-manager';

  @ViewChild('snav', {static: true})
  snav: MatSidenav;

  mobileQuery: MediaQueryList;

  private mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
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
}
