import { Component, OnInit } from '@angular/core';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';
import { ModalController } from '@ionic/angular';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
})
export class TablesComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  async search(): Promise<void> {
    const modal = await this.modalController.create({
      component: SearchComponent
    });
    await modal.present();
  }

  async readQr(): Promise<void> {
    const modal = await this.modalController.create({
      component: QrScannerComponent
    });
    await modal.present();
  }
}
