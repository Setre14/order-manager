import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material';
import {OrderService} from './service/order.service';
import {ItemService} from './service/item.service';
import {Item} from './class/item';
import {Order} from './class/order';
import {LangService} from './service/lang.service';

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

    this.init();
  }

  ngOnInit() {
    this.langService.title = 'Order Manager';
  }

  init() {
    this.itemsService.addItem(
      new Item('item1', 'food', 5.40)
    );
    this.itemsService.addItem(
      new Item('item2', 'beverage', 3.50)
    );
    this.itemsService.addItem(
      new Item('item3', 'food', 2.00)
    );

    const order: Order = new Order('6');
    order.addItem(this.itemsService.getItem('item1'));
    order.addItem(this.itemsService.getItem('item1'));
    order.addItem(this.itemsService.getItem('item2'));

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
