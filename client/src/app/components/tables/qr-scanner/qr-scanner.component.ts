import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['../../../style.scss'],
})
export class QrScannerComponent implements OnInit {
  currentDevice: MediaDeviceInfo = null;
  hasPermission: boolean;

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  // Scans the QR code
  onCodeResult(resultString: string): void {
    this.navCtrl.navigateForward(['/tables', 'detail', resultString]);
    this.close();
  }

  // Permission for the app to use the device camera
  onHasPermission(has: boolean): void {
    this.hasPermission = has;
  }

  close(): void {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
}
