import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material';
import {SearchOverlayService} from './search/search-overlay.service';
import {OrderService} from './order/order.service';
import {ItemService} from './item/item.service';
import {Item} from './item/item';
import {Order} from './order/order';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'order-manager';

  @ViewChild('snav', {static: true})
  snav: MatSidenav;

  mobileQuery: MediaQueryList;
  mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public searchOverlay: SearchOverlayService,
    public ordersService: OrderService,
    public itemsService: ItemService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    // this.mobileQuery.addListener(this.mobileQueryListener);

    this.init();
  }

  init() {
    this.itemsService.addItem(
      new Item('item1', 5.40)
    );
    this.itemsService.addItem(
      new Item('item2', 3.50)
    );
    this.itemsService.addItem(
      new Item('item3', 2.00)
    );

    const order: Order = new Order('6');
    order.addItem(this.itemsService.getItem('item1'));
    order.addItem(this.itemsService.getItem('item1'));
    order.addItem(this.itemsService.getItem('item3'));

    this.ordersService.addOrder(order);
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
