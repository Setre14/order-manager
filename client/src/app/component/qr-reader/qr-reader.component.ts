import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-qr-reader',
  templateUrl: './qr-reader.component.html',
  styleUrls: ['./qr-reader.component.scss']
})
export class QrReaderComponent implements OnInit {
  currentDevice: MediaDeviceInfo = null;
  hasPermission: boolean;

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  // Scans the QR code
  onCodeResult(resultString: string): void {
    this.router.navigate(['/table', resultString]);
  }

  // Permission for the app to use the device camera
  onHasPermission(has: boolean): void {
    this.hasPermission = has;
  }
}


