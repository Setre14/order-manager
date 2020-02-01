import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  @Input() tables: string[];

  constructor(
    private orderService: OrderService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.orderService.loadAllOpenOrder();
  }

  hasOpenOrder(table: string): boolean {
    return this.orderService.hasOpenOrder(table);
  }

  route(table: string): void {
    this.navCtrl.navigateForward(['/tables', 'detail', table])
  }
}
