import { Component, OnInit } from '@angular/core';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';
import { ModalController } from '@ionic/angular';
import { SearchComponent } from './search/search.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['../../style.scss'],
})
export class TablesComponent implements OnInit {
  constructor(
    private modalController: ModalController,
    private router: Router
  ) {}

  ngOnInit() {}

  showTabs(): boolean {
    return (
      this.router.url.includes('overview') || this.router.url.includes('detail')
    );
  }

  async search(): Promise<void> {
    const modal = await this.modalController.create({
      component: SearchComponent,
    });
    await modal.present();
  }

  async readQr(): Promise<void> {
    const modal = await this.modalController.create({
      component: QrScannerComponent,
    });
    await modal.present();
  }
}
