import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-qr-reader',
  templateUrl: './qr-reader.component.html',
  styleUrls: [
    './qr-reader.component.scss',
    '../../style/style.scss'
  ]
})
export class QrReaderComponent implements OnInit {
  currentDevice: MediaDeviceInfo = null;
  hasPermission: boolean;

  constructor(
    public router: Router,
    public dialogRef: MatDialogRef<QrReaderComponent>
  ) { }

  ngOnInit() {
  }

  // Scans the QR code
  onCodeResult(resultString: string): void {
    this.router.navigate(['/table', resultString]);
    this.close();
  }

  // Permission for the app to use the device camera
  onHasPermission(has: boolean): void {
    this.hasPermission = has;
  }

  close(): void {
    this.dialogRef.close();
  }
}


