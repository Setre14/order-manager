import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material';
import {OrderService} from './service/order.service';
import {ItemService} from './service/item.service';
import {LangService} from './service/lang.service';
import {Item, Order} from '../../../shared/src';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'order-manager';

  @ViewChild('snav', {static: true})
  snav: MatSidenav;

  mobileQuery: MediaQueryList;
  mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public ordersService: OrderService,
    public itemsService: ItemService,
    public langService: LangService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    // this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit() {
    this.langService.title = 'Order Manager';
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
