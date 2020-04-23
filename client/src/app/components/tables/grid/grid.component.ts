import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { NavController } from '@ionic/angular';
import { Table } from '../../../../../../shared';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['../../../style.scss'],
})
export class GridComponent implements OnInit {
  @Input() tables: Table[];

  constructor(
    private orderService: OrderService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.orderService.load();
  }

  hasOpenOrder(table: Table): boolean {
    return this.orderService.hasOpenOrder(table._id);
  }

  route(table: Table): void {
    this.navCtrl.navigateForward(['/tables', 'detail', table.name]);
  }
}
